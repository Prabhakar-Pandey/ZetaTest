import logo from './logo.svg';
import './App.css';
import React from 'react';


/**
 * 
 * {
"id": "10",
"author": "Paul Jarvis",
"width": 2500,
"height": 1667,
"url": "https://unsplash.com/photos/6J--NXulQCs",
"download_url": "https://picsum.photos/id/10/2500/1667"
}
 * 
 * 
*/

async function fetchData(url){

  const response = await (await fetch(url)).json()
  return response;

}


function ImageTileComponent({url,author}){
  return (
    <div>
      <img className="image" src={url} alt="image"/>
    </div>
    
  )
}


/**
 * topArray = [1,2,3,4,5,6]
 * currentArray [4,5,6]
 * bottoArray = [7,8,9]
 * 
 */




const LIMIT = 50;
const currentArray = [];
function removeFromTop(array){

}
function pushIntoArray(arrayOfData){
  arrayOfData.forEach(item=>{
    currentArray.push(item)
  })

  if(currentArray.length>LIMIT){

  }

}


function ImageContainerComponent(props){
 
  const [data,setData] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(1)

  React.useEffect(()=>{
    const response = fetchData(`https://picsum.photos/v2/list?page=${pageNumber}&limit=10`)
    .then(response=>{
      setData(response)
    });
    observerListner();
  },[])


  React.useEffect(()=>{
    const response = fetchData(`https://picsum.photos/v2/list?page=${pageNumber}&limit=10`)
    .then(response=>{

      let updatedData = data;

      updatedData = [...updatedData,...response]
      updatedData = JSON.parse(JSON.stringify(updatedData))
      setData(updatedData)
    });
  },[pageNumber])

  const handleIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      console.log(entry)
      if(entry.isIntersecting){
        // call next api
        
        const page = pageNumber+1
        console.log("calling api now!",page)
        setPageNumber((prev)=>prev+1);
      }

    });
  }

  function observerListner(){
    let observer;
    let boxElement = document.getElementById("showMore")
    let options = {
      root: null,
      rootMargin: "0px",
    };

  observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(boxElement);

  }

  console.log(data)

  return (
    <div className="App">
        <div className="image-wrapper">
        {
          data && data.length ?
          data.map(item=>{
            return (
              <ImageTileComponent url={item.download_url}/>
            )
          }):<div>Loading...</div>
        }
        
        </div>
        <div id="showMore">Show More</div>
    </div>
  )
}




function App() {
  return (
    //<Provider store={store}>
      <ImageContainerComponent />
    //</Provider>
  );
}

export default App;
