export class ProductRequestDTO {
    constructor({
        title,
        description,
        price,
        code,
        status,
        stock,
        category,
        thumbnails,
    }) {
        if (
            !title ||
            !description ||
            price === undefined ||
            !code ||
            status === undefined ||
            stock === undefined ||
            !category ||
            !thumbnails
        ) {
            throw new Error("Faltan datos obligatorios");
        }
        this.title = title;
        this.description = description;
        this.price = price;
        this.code = code;
        this.status = status;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails;
    }
}
