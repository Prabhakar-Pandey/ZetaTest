import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {selectPosts, getComments} from '../store';


export default function useFetch({ url, actionName }) {
  const [posts, setPosts] = React.useState([]);
  const dispatch = useDispatch();
    function setDataToStore(data){
        dispatch({
            type:actionName?actionName:"getposts",
            payload:data
        })
    }

  const fetchData = async (url) => {
    const data = await fetch(url);
    const response = await data.json();
    setPosts(response);
    setDataToStore(response)
  };

  const postResponse = useSelector(selectPosts);
  const getCommentsResponse = useSelector(getComments);
  React.useEffect(() => {
    fetchData(url);
  }, [url]);

  return [posts, postResponse,getCommentsResponse];
}
