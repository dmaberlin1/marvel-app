
import {useHttp} from "../hooks/http.hook";

const useMarvelService=()=> {
    const {loading,request,error,clearError}=useHttp()

    const API_KEY='apikey=e6a445e6cc8830fe096f8921d13a8c66'
    const API_PATCH='https://gateway.marvel.com:443/v1/public'
    const BASE_OFFSET=215
    // getResource = async (url) => {
    //     let res = await fetch(url);
    //
    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url},status:${res.status}`);
    //     }
    //     return await res.json();
    // }

   const getAllCharacters = async (offset=BASE_OFFSET) => {
        const res=await  request(`${API_PATCH}/characters?limit=9&offset=${offset}&${API_KEY}`)
        return res.data.results.map(_transformCharacter)
    }
    const getAllComics = async(offset=0) => {
      const res=await request(
        `${API_PATCH}characters?limit=9&offset=${offset}&${API_KEY}`
      )
    }

   const getCharacter = async(id) => {
        const res= await request(`${API_PATCH}/characters/${id}?${API_KEY}`)
        return _transformCharacter(res.data.results[0]);

    }

   const _transformCharacter = (char) => {
        return {
            name: char.name,
            id:char.id,
            description: char.description ? `${char.description.slice(0,190)}...`
              :'There is no description for this amazing hero',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics:char.comics.items
        }
    }

    return {loading,error,clearError,getAllCharacters,getCharacter}
}

export default useMarvelService