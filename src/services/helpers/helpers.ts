import type { Product } from '@/types'

export function isMobile() {
    if( screen.width <= 760 ) {
        return true;
    }
    else {
        return false;
    }
}

export function setStatus(product: Product) {
    let status = 'In stock';

    if (product.useUp) {
        const countdown = calculateUseUpBy(product.useUp);

        if (countdown < 0) {
            status = 'Expired for ' + countdown + ' days'
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

function calculateUseUpBy(useUp: Date) {
    const today = new Date();
    const diffTime = Math.abs(useUp.getTime() - today.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));     
}