import axios from 'axios'

const apiKey = "25540812-faf2b76d586c1787d2dd02736";

export async function getData(catagory='sport'){
    try{
        let res = await axios.get(`https://pixabay.com/api/?key=${apiKey}&q=${catagory}&image_type=photo`)
        if (res && res.data && res.data.hits) {
            return {[catagory]:res.data.hits.sort((a,b)=> a.id > b.id ? 1 : -1)}
        }
    } catch(e){
        console.error(e);
    }
}
