import axios from 'axios';

const server = axios.create();


export const get = function(fullUrl='https://swapi.dev/api/films/') {

    // extract parameters
    // var pattern = "api/";
    // var url = fullUrl.substr(fullUrl.indexOf(pattern)+ pattern.length); 
    // var id =  url.substr(url.indexOf('/')+1,url.lastIndexOf('/') -url.indexOf('/')-1 )

    return server.get(fullUrl);

    // server.get('/user/contacts' )
    // .then( ({ data }) => {
    //     if (!data)
    //         server.post('/user/contacts', {contacts} )
    //         .then( ({ data }) => {
    //         //    return data;
                
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
        
        
    // })
    // .catch(err => {
    //     console.log(err);
    // })

}