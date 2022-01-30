import { createStore } from 'vuex';
import { Storage } from '@capacitor/storage';


export default createStore({
    state: {
        token: null
      },
      mutations: {
        setToken(state, payload) {
          state.token = payload.token;
          Storage.set({
              key: 'token',
              value: payload.token
          })
        },
        removeToken(state) {
          state.token = null;
          Storage.remove({
              key: 'token'
          })
        }
      },
      actions: {
      },
      modules: {
      },
      getters: {
        async getToken(store){
          return Storage.get({ key: 'token' }).then((token) => {
            store.token = token.value;
            return token.value;
          });
        }
      }
})