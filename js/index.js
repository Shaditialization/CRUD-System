var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescriptionInput = document.getElementById('productDescription');

var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');



var productsContainer = [];
if (localStorage.getItem('products') != null)
{
    productsContainer = JSON.parse(localStorage.getItem('products'));
    displayProducts(productsContainer);
}



function addProduct()
{
    if (validateProductName() == true)
    {
        var product =
        {
          name: productNameInput.value,
          price: productPriceInput.value,
          category: productCategoryInput.value,
          description: productDescriptionInput.value,
        };
        productsContainer.push(product);
        console.log(productsContainer);
        localStorage.setItem("products", JSON.stringify(productsContainer));
        displayProducts(productsContainer);
        clearForm();
    }
    else
    {
        alert('Product Name Invalid, It must be at least 3 letters long and begins with a capital letter');
    }
}





function displayProducts(arr)
{
    var cartona = ``;
    for (var i = 0; i < arr.length; i++)
    {
        cartona += `<tr>
                    <td>${arr[i].name}</td>
                    <td>${arr[i].price}</td>
                    <td>${arr[i].category}</td>
                    <td>${arr[i].description}</td>
                    <td><button onclick="setFormForUpdate(${i});" class="btn btn-outline-warning btn-sm">Update</button></td>
                    <td><button onClick="deleteProduct(${i});" class="btn btn-outline-danger btn-sm">Delete</button></td>
                </tr>`
    }
    document.getElementById('tableBody').innerHTML = cartona;
}







function clearForm()
{
    productNameInput.value = '';
    productPriceInput.value = '';
    productCategoryInput.value = '';
    productDescriptionInput.value = '';
}





function deleteProduct(productIndex)
{
    productsContainer.splice(productIndex, 1);
    localStorage.setItem('products', JSON.stringify(productsContainer));
    displayProducts(productsContainer);
}






function searchProducts(term)
{
    var matchedProducts = [];
    for (var i = 0; i < productsContainer.length; i++)
    {
        if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase()) === true)
        {
            matchedProducts.push(productsContainer[i]);
        }
    }
    console.log(matchedProducts);
    displayProducts(matchedProducts);
}




function setFormForUpdate(i)
{
    addBtn.classList.replace('d-block', 'd-none');
    updateBtn.classList.replace('d-none', 'd-block');
    productNameInput.value = productsContainer[i].name;
    productPriceInput.value = productsContainer[i].price;
    productCategoryInput.value = productsContainer[i].category;
    productDescriptionInput.value = productsContainer[i].description;
}




function validateProductName()
{
    var regex = /^[A-Z][a-z]{2,8}$/;
    if (regex.test(productNameInput.value) == true)
    {
        return true;
    }
    else
    {
        return false;
    }
}









