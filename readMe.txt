API RESPONSES->

Basic Auth error
{
    "response_code": 401,
    "response_message": "Authentication error"
}


Invalid JWT token error->
{
    "response_code": 500,
    "response_message": "Internal server error.",
    "result": {
        "name": "JsonWebTokenError",
        "message": "invalid signature"
    }
}

Add Product->
request
{
	"userId":"5d6f662d8590f00fae26ec92",
    "name": "Apples",
    "decs": "asdfasdfas d fsadf asdf asdf ",
    "availableQuantity": 7,
    "unitPrice": 40
}
response
{
    "response_code": 200,
    "response_message": "Product is saved successfully.",
    "result": {
        "status": "ACTIVE",
        "_id": "5d6f6c73753dc21523901966",
        "name": "Banana",
        "decs": "Fresh kerela bananas",
        "createdAt": "2019-09-04T07:49:07.814Z",
        "updatedAt": "2019-09-04T07:49:07.814Z",
        "__v": 0
    }
}

Delete product->
request-
{
	"userId":"5d6f662d8590f00fae26ec92",
	"productId":"5d6f6d6efa7fa317b6112fcb"
}
response-
{
    "response_code": 204,
    "response_message": "Product  deleted successfully.",
    "result": {
        "status": "ACTIVE",
        "_id": "5d6f6d6efa7fa317b6112fcb",
        "name": "Banana",
        "decs": "Fresh kerela bananas",
        "createdAt": "2019-09-04T07:53:18.427Z",
        "updatedAt": "2019-09-04T07:53:18.427Z",
        "__v": 0
    }
}

Modify->
request-
{
	"userId":"5d6f662d8590f00fae26ec92",
	"productId":"5d6f69f223b65011991cf5e7",
    "name": "Apples",
    "decs": "Kashmiri apples",
    "availableQuantity": 9,
    "unitPrice": 33
}
response-
{
    "response_code": 200,
    "response_message": "Product  is updated successfully.",
    "result": {
        "status": "ACTIVE",
        "_id": "5d6f69f223b65011991cf5e7",
        "name": "Apples",
        "decs": "Kashmiri apples",
        "createdAt": "2019-09-04T07:38:26.089Z",
        "updatedAt": "2019-09-04T07:55:48.334Z",
        "__v": 0,
        "availableQuantity": 9,
        "unitPrice": 33
    }
}


View Products->
request
{
	"userType":"CUSTOMER"
}
response-
{
    "response_code": 200,
    "response_message": "Data found successfully.",
    "result": [
        {
            "_id": "5d6f85ad5a3fb22a8635b0e5",
            "name": "Grapes",
            "unitPrice": 70
        },
        {
            "_id": "5d6f810109fdd026c5b9828f",
            "name": "Banaana",
            "unitPrice": 72
        },
        {
            "_id": "5d6f759b691d301d7ea85136",
            "name": "Banana",
            "unitPrice": 7
        },
        {
            "_id": "5d6f7596691d301d7ea85135",
            "name": "Papaya",
            "unitPrice": 13
        }
    ]
}