module.exports = {
    sendResponseWithPagination : (responseObj, responseCode, responseMessage, data, paginationData) =>{
        return responseObj.send({'response_code':responseCode,'response_message':responseMessage,result:data,paginationData:paginationData})
    },
    sendResponseWithData: (responseObj, responseCode, responseMessage, data, token) => {
        return responseObj.send({'response_code':responseCode,'response_message':responseMessage,result:data, token:token});
    },
    sendResponseWithoutData: (responseObj, responseCode, responseMessage) => {
        return responseObj.send({'response_code':responseCode,'response_message':responseMessage});
    },
    sendResponseWithHeader: (responseObj, responseCode, responseMessage, data, header) => {
        return responseObj.header(header).send({'response_code':responseCode,'response_message':responseMessage,result:data});
    },
};