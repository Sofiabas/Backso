const { buildSchema } = require(`graphql`);

const productType = `
type Product{
    id: ID!,
    nombre: String!,
    descripcion: String!,
    codigo: Float!,
    thumbnail: String!,
    precio: Float!,
    stock: Float!,
    cantidad: Float!
}`;

const productInput = `
input ProductInput {
    nombre: String!,
    descripcion: String!,
    codigo: Float!,
    thumbnail: String!,
    precio: Float!,
    stock: Float!,
}`;

const productsQueries = `
getAllProducts: [Product]
getProductById(id: ID!) : Product
`;

const productsMutation = `
addProduct(data: ProductInput) : Product
updateProductById(id: ID!, data: ProductInput) : Product
deleteProductById(id: ID!) : ID
`;

const schema = buildSchema(`
${productType}
${productInput}
type Query {
    ${productsQueries}
}
type Mutation {
    ${productsMutation}
}
`);

module.exports = schema;
