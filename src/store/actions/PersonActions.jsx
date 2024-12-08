export { removeperson } from '../reducers/personslice'
import axios from '../../components/utls/Axios'
import { loadperson } from '../reducers/personslice'

export const asyncloadperson = (id) => async (dispatch, getstate) => {
    try {
        const detail = await axios.get(`/person/${id}`);
        const externalid = await axios.get(`/person/${id}/external_ids`);
        const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
        const tvCredits = await axios.get(`/person/${id}/movie_credits`);
        const movieCredits = await axios.get(`/person/${id}/movie_credits`);
    
        let theultimatedetails = {
            detail:  detail.data,
            externalid:  externalid.data,
            combinedCredits : combinedCredits.data,
            tvCredits : tvCredits.data,
            movieCredits : movieCredits.data,
        }
        dispatch(loadperson(theultimatedetails))
        // console.log(theultimatedetails)
    } catch (error) {
        console.log(error)
    }
}