import { useEffect } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setVidFirst, setVid } from "../Components/SearchVidSlice"
import { useRef } from "react"
import { setnextpagesearch } from "../Components/NextPageSliceSearch"

export const SearchFunction = (input, node) => {

    const dispatch = useDispatch();
    const loading = useRef()
    const nextPageToken = useSelector(state => state.nextPageToken)


    useEffect(() => {
        const handlesearch = async () => {
            if (!input) return
            try {
                const searchres = await axios({
                    method: 'GET',
                    url: 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&key=AIzaSyDrWy88a14NL3MJx1UIY_4KXAnu_DnWnng',
                    params: { q: input }
                })
                dispatch(setVidFirst(searchres.data.items))


            } catch (err) {
                console.log(err)
            }
        }

        handlesearch()
    }, [input])

}