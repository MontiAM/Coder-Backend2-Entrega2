export class ProductResponseDTO {
    constructor(product) {
        this.id = product.id || product._id;
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.stock = product.stock;
    }
}
