export { removetv } from '../reducers/tvslice'
import axios from '../../components/utls/Axios'
import { loadtv } from '../reducers/tvslice'

export const asyncloadtv = (id) => async (dispatch, getstate) => {
    try {
        const detail = await axios.get(`/tv/${id}`);
        const externalid = await axios.get(`/tv/${id}/external_ids`);
        const recommendations = await axios.get(`/tv/${id}/recommendations`);
        const similar = await axios.get(`/tv/${id}/similar`);
        const videos = await axios.get(`/tv/${id}/videos`);
        const translations = await axios.get(`/tv/${id}/translations`);
        const watchproviders = await axios.get(`/tv/${id}/watch/providers`);
        let theultimatedetails = {
            detail:  detail.data,
            externalid:  externalid.data,
            recommendations:  recommendations.data.results,
            similar:  similar.data.results,
            translations:  translations.data.translations.map(t => t.english_name),
            videos:  videos.data.results.find((m) => m.type === "trailer"),
            watchproviders:  watchproviders.data.results.IN,
        }
        dispatch(loadtv(theultimatedetails))
        // console.log(theultimatedetails)
    } catch (error) {
        console.log(error)
    }
}