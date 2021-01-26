import {get} from '../api/swapi.dev.server';
import { Link, useLocation ,withRouter} from 'react-router-dom'
import { useEffect, useState } from 'react';

export const Description = withRouter( () => {
    
    const location = useLocation().pathname;
    const path = location.substring(1,location.lastIndexOf('/'));
    const id = location.substring(location.lastIndexOf('/')+1);
    const url = 'https://swapi.dev/api/'+ path +'/'+id+'/'; // TODO: change

    const [data, setData] = useState({});
    const [dataStrings, setDataStrings] = useState([]);
    const [dataLinks, setDataLinks] = useState([]);

    const regulateCategory = category => {
        switch(category){
            case 'characters' :
                return 'people';
            case  'residents':
                return 'people';
            case 'pilots':
                return 'people';
            case 'homeworld':
                return 'planets';
           

            default: return category;
        }
    };
    

    useEffect(() => {

        setData({});
        setDataStrings([]);
        setDataLinks([]);
        
        get(url).then(res => {
            const results = res.data;
            let strings = [];
            let links = [];

        for (const [key, value] of Object.entries(results)){

        switch(typeof value) {

            case 'number':  break; // id
            case 'object': // link array

              let arr = [];

              for (let i=0; i< value.length; i++){
                  const link = value[i];
                   // get link info
                    get(link).then(result => {
                        let url = result.data.url;
                        url = url.substring(0,url.lastIndexOf('/'))
                        let id = url.substring(url.lastIndexOf('/')+1);
                        arr.push({title: result.data.name?result.data.name:result.data.title?result.data.title:'null' , id});

                        if(i === value.length -1){
                            links.push({key, value: arr});
                            setDataLinks(dataLinks=> [...dataLinks, {key, value: arr}]);
                        }
                          
                    })
                    .catch(err => {
                        console.log(err);
                        // this.router.navigate(['/error','server_connection_error']);
                        }) 
              }

            
              break;
              
            case 'string': 
              if (key === 'title' || key === 'name'|| key === 'url' ) break;
  
              if(value.search('http') !== -1){ // single link
                get(value).then(result => {
                    let url = result.data.url;
                    url = url.substring(0,url.lastIndexOf('/'))
                    let id = url.substring(url.lastIndexOf('/')+1);
                    setDataLinks(dataLinks => [...dataLinks, {key, value: [{title: result.data.name?result.data.name:result.data.title?result.data.title:'null' , id}]}]);
                })
                .catch(err => {
                  console.log(err);
                }) 
                break; 
              }
              
              // try to build a date from value
              let date ;
              date = new Date(value) 
             
              if (!isNaN(date) && value.indexOf('-')!==-1){ //date
                // date format
                date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
                // update state
                strings.push({key, value:date});

              } else { // not a date
                // update state
                strings.push({key, value});
              }   
              break;
            default: break;
          }

        }
        setData(results);
        setDataStrings(dataStrings =>[...dataStrings, ...strings]);
        
           
        }).catch(err => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [useLocation()])

   
    const formatTitle = title => {
        if (!title) return "";
        var splitStr =  title.replace(/_/g, " ").toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
           splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
       }
       return splitStr.join(' '); 
      }


    
    return <>
        <h2>  <i> {data.name? formatTitle(data.name) : formatTitle(data.title)} </i></h2>
    
        <ul>
            {dataStrings.map((s) => {
                return <li className="line" key={s.key}><h3> {formatTitle(s.key)}</h3> {s.value}</li>
            })}
             {dataLinks.map(category => {
                return <li className="line" key={category.key}>

                        <h3> {formatTitle(category.key)} </h3>
                        <ul>
                            {category.value.map(l => <li  key={l.title+l.id}> <Link to={'/'+regulateCategory(category.key)+'/'+l.id} > {l.title} </Link>  </li>)}
                        </ul>
                </li>
            })}
        </ul>
    </>

})
