import type { Product } from '@/types'

export const statusObjects = [
    {
        value: 'inStock',
        label: 'In stock',
    },
    {
        value: 'onShoppingList',
        label: 'On shopping list',
    },
    {
        value: 'closeToExpiry',
        label: 'Use up in less than 5 days',
    },
    {
        value: 'expiresToday',
        label: 'Use up today',
    },
    {
        value: 'expired',
        label: 'Expired',
    },
]

export function setStatus(product: Product) {
    let status = 'In stock';

    if (product.useUp) {
        const countdown = calculateUseUpBy(product.useUp);

        if (countdown < 0) {
            status = 'Expired for ' + -countdown + ' days'
        }
        else if  (countdown == 0) {
            status = 'Use up today';
        } 
        else if (countdown < 5) {
            status = 'Expires in ' + countdown + ' days'
        }
    }

    if (product.onShoppingList) {
        status = 'On shopping list'
    }

    return status;
}

export function parseQueryWithStatus(query: any) {
    let statusQuery = {};
    switch (query.status) {
        case 'inStock': 
            statusQuery = {
                inStock: true,
                useUpMin: getDateWithOffset(new Date, 6)
            }
            break;
        case 'onShoppingList':
            statusQuery = {
                onShoppingList: true
            }
            break;
        case 'closeToExpiry':
            statusQuery = {
                hasUseUp: true,
                useUpMin: getDateWithOffset(new Date, 1),
                useUpMax: getDateWithOffset(new Date, 5)
            }
            break;
        case 'expiresToday':
            statusQuery = {
                hasUseUp: true,
                useUpMin: getFormattedDate(new Date),
                useUpMax: getFormattedDate(new Date)
            }
            break;
        case 'expired':
            statusQuery = {
                hasUseUp: true,
                useUpMax: getDateWithOffset(new Date, -1)
            }
            break;
        default: 
            break;
    }

    const parsedQuery = {...query, ...statusQuery};
    return parsedQuery;
}

function getDateWithOffset(date: Date, offsetDays: number) {
    const dateOffset = (24 * 60 * 60 * 1000) * offsetDays;
    const time = date.setTime(date.getTime() + dateOffset);
    return getFormattedDate(new Date(time));
}

function getFormattedDate(date: Date) {
    date.setUTCHours(0,0,0,0);
    return date.toISOString().substring(0,10);
}

function calculateUseUpBy(useUp: Date) {
    const today = new Date();
    const diffTime = useUp.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));     
}