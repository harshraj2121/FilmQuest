export { removemovie } from '../reducers/Movieslice'
import axios from '../../components/utls/Axios'
import { loadmovie } from '../reducers/Movieslice'

export const asyncloadmovie = (id) => async (dispatch, getstate) => {
    try {
        const detail = await axios.get(`/movie/${id}`);
        const externalid = await axios.get(`/movie/${id}/external_ids`);
        const recommendations = await axios.get(`/movie/${id}/recommendations`);
        const similar = await axios.get(`/movie/${id}/similar`);
        const videos = await axios.get(`/movie/${id}/videos`);
        const watchproviders = await axios.get(`/movie/${id}/watch/providers`);
        let theultimatedetails = {
            detail:  detail.data,
            externalid:  externalid.data,
            recommendations:  recommendations.data.results,
            similar:  similar.data.results,
            videos:  videos.data.results.find((m) => m.type === "trailer"),
            watchproviders:  watchproviders.data.results.IN,
        }
        dispatch(loadmovie(theultimatedetails))
        // console.log(theultimatedetails)
    } catch (error) {
        console.log(error)
    }
}