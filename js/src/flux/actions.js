
import { savePlaces, loadPlaces } from './reducers';

export const actions = {
	'SAVE_PLACES': (oldStore, options) => savePlaces(oldStore, options),
	'LOAD_PLACES': (oldStore, options) => loadPlaces(oldStore, options),
}