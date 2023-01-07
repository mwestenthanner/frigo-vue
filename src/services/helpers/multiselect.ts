export function getOptions(object: any) {
    const options: any[] = [];

    object.forEach((element: any) => {
        options.push({
            name: element.name,
            value: element.id
        });
    });

    return options;
}