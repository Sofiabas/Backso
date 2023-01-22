const socket = io();

const tbodyProducts = document.getElementById(`tbodyProducts`);

const nameForm = document.getElementById(`nameForm`);
const priceForm = document.getElementById(`priceForm`);
const imgForm = document.getElementById(`imgForm`);
const addProduct = document.getElementById(`sendMessage`);


socket.emit(`sendProduct`);

addProduct.addEventListener('click', () => {
    const product = {
        name: nameForm.value,
        price: priceForm.value,
        img: imgForm.value
    }

    nameForm.value = "";
    priceForm.value = "";
    imgForm.value = "";

    socket.emit('addProducts', product);
});


socket.on(`refreshTable`, data => {
    console.log("data");
    console.log(data);
    product = `
        <tr>
            <th scope="row">
                ${data[0]._id}
            </th>
            <td>
                ${data[0].title}
            </td>
            
            <td>
                ${data[0].price} 
            </td>
            <td>
                <img src="${data[0].thumbnail}" width="60" height="60">
            </td>
        </tr>
    `;
    tbodyProducts.innerHTML += product;
});


socket.on(`allProducts`, data => {

    data.forEach(product => {
        product = `
            <tr>
                <th scope="row">
                    ${product._id}
                </th>
                <td>
                    ${product.title}
                </td>
                <td>
                    ${product.price} 
                </td>
                <td>
                    <img src="${product.thumbnail}" width="60" height="60">
                </td>
            </tr>
        `;
        tbodyProducts.innerHTML += product;
    });
});

