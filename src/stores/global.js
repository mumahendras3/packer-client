import { defineStore } from 'pinia';
import axios from 'axios';
import { showError, showWarning, showSuccess } from '../helpers/popups';
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const useGlobalStore = defineStore('global', {
  state: () => ({
    newlyRegisteredUser: undefined,
    isLoggedIn: Boolean(localStorage.access_token || sessionStorage.access_token),
    posts: [],
    totalPosts: 0
  }),
  actions: {
    async register(formData) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${serverUrl}/register`,
          data: formData
        });
        showSuccess(data);
        this.newlyRegisteredUser = data;
        this.router.push('/login');
      } catch (err) {
        if (err.response)
          return showError(err.response.data);
        showError(err);
      }
    },
    async login(formData) {
      try {
        // Sign-in only need these data
        const { email, password, rememberMe, githubAccessToken } = formData;
        const { data: { access_token } } = await axios({
          method: 'POST',
          url: `${serverUrl}/login`,
          data: { email, password }
        });
        if (rememberMe) {
          localStorage.access_token = access_token;
          // We store the GitHub personal access token only in memory since
          // it is sensitive data
          if (githubAccessToken)
            localStorage.authorization = `Bearer ${githubAccessToken}`;
        } else {
          sessionStorage.access_token = access_token;
          // We store the GitHub personal access token only in memory since
          // it is sensitive data
          if (githubAccessToken)
            sessionStorage.authorization = `Bearer ${githubAccessToken}`;
        }
        this.updateLoginStatus();
        showSuccess({ loggingIn: true });
        this.router.push('/');
      } catch (err) {
        if (err.response)
          return showError(err.response.data);
        showError(err);
      }
    },
    logout() {
      localStorage.removeItem('access_token');
      sessionStorage.removeItem('access_token');
      this.updateLoginStatus();
      showSuccess({ loggingOut: true });
      this.router.push('/login');
    },
    updateLoginStatus() {
      if (localStorage.access_token || sessionStorage.access_token)
        return this.isLoggedIn = true;
      this.isLoggedIn = false;
    },
    resetNewlyRegisteredUser() {
      this.newlyRegisteredUser = undefined;
    },
    async fetchPosts(...query) {
      try {
        let axiosOptions = {
          method: 'GET',
          url: `${serverUrl}/public/posts`
        };
        if (query.length) {
          axiosOptions.url += `?${query.join('&')}`;
        }
        const { data } = await axios(axiosOptions);
        this.posts = data;
        if (query.length < 1)
          this.totalPosts = data.length;
      } catch (err) {
        if (err.response)
          return showError(err.response.data);
        showError(err);
      }
    },
    async fetchPostById(id) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${serverUrl}/public/posts/${id}`
        });
        return data;
      } catch (err) {
        if (err.response)
          return showError(err.response.data);
        showError(err);
      }
    },
    async fetchBookmarks() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${serverUrl}/public/bookmarks`,
          headers: {
            access_token: localStorage.access_token || sessionStorage.access_token
          }
        });
        return data;
      } catch (err) {
        if (err.response)
          return showError(err.response.data);
        showError(err);
      }
    },
    async bookmarkPost(postId) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${serverUrl}/public/bookmarks/${postId}`,
          headers: {
            access_token: localStorage.access_token || sessionStorage.access_token
          }
        });
        if (!data.newlyBookmarked)
          return showWarning({ message: 'Post already bookmarked' });
        showSuccess(data);
      } catch (err) {
        if (err.response)
          return showError(err.response.data);
        showError(err);
      }
    },
    async unbookmarkPost(postId) {
      try {
        const { data } = await axios({
          method: 'DELETE',
          url: `${serverUrl}/public/bookmarks/${postId}`,
          headers: {
            access_token: localStorage.access_token || sessionStorage.access_token
          }
        });
        showSuccess(data);
        return true;
      } catch (err) {
        if (err.response)
          return showError(err.response.data);
        showError(err);
      }
    },
    async getPostDetailQrCode(postDetailPath) {
      try {
        const postDetailUrl = import.meta.env.VITE_CLIENT_URL + postDetailPath;
        const { data } = await axios({
          method: 'POST',
          url: `${serverUrl}/public/qr-code`,
          data: {
            postDetailUrl
          }
        });
        return data;
      } catch (err) {
        if (err.response)
          return showError(err.response.data);
        showError(err);
      }
    },
    async googleOauthCallback(response) {
      try {
        const { data: { access_token } } = await axios({
          url: `${serverUrl}/public/login`,
          method: 'POST',
          headers: {
            google_oauth_token: response.credential
          }
        });
        localStorage.access_token = access_token;
        this.updateLoginStatus();
        showSuccess({ loggingIn: true });
        this.router.push('/');
      } catch (err) {
        if (err.response)
          return showError(err.response.data);
        showError(err);
      }
    }
  }
});