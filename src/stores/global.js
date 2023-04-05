import { defineStore } from 'pinia';
import axios from 'axios';
import { showError, showWarning, showSuccess } from '../helpers/popups';
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const useGlobalStore = defineStore('global', {
  state: () => ({
    newlyRegisteredUser: undefined,
    isLoggedIn: Boolean(localStorage.access_token || sessionStorage.access_token),
    hasGithubAccessToken: Boolean(localStorage.authorization || sessionStorage.authorization),
    repos: [],
    tasks: []
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
    async fetchRepos() {
      try {
        let axiosOptions = {
          method: 'GET',
          url: `${serverUrl}/repos`,
          headers: {
            access_token: localStorage.access_token || sessionStorage.access_token
          }
        };
        const { data } = await axios(axiosOptions);
        this.repos = data;
      } catch (err) {
        if (err.response)
          return showError(err.response.data);
        showError(err);
      }
    },
    async fetchTasks() {
      try {
        let axiosOptions = {
          method: 'GET',
          url: `${serverUrl}/tasks`,
          headers: {
            access_token: localStorage.access_token || sessionStorage.access_token
          }
        };
        const { data } = await axios(axiosOptions);
        this.tasks = data;
      } catch (err) {
        if (err.response)
          return showError(err.response.data);
        showError(err);
      }
    },
    getGithubAccessToken() {
      if (localStorage.authorization) {
        return localStorage.authorization
      }
      if (sessionStorage.authorization) {
        return sessionStorage.authorization
      }
    },
    async addRepo(formData) {
      try {
        const axiosOptions = {
          method: 'POST',
          url: `${serverUrl}/repos`,
          data: formData,
          headers: {
            access_token: localStorage.access_token || sessionStorage.access_token
          }
        };
        if (this.hasGithubAccessToken) {
          axiosOptions.headers.authorization = this.getGithubAccessToken();
        }
        const { data } = await axios(axiosOptions);
        showSuccess(data);
        await this.fetchRepos();
        this.router.push('/');
      } catch (err) {
        if (err.response)
          return showError(err.response.data);
        showError(err);
      }
    },
    async checkUpdateAllRepos() {
      const axiosOptions = {
        method: 'PATCH',
        url: `${serverUrl}/repos`,
        headers: {
          access_token: localStorage.access_token || sessionStorage.access_token
        }
      };
      if (this.hasGithubAccessToken) {
        axiosOptions.headers.authorization = this.getGithubAccessToken();
      }
      const { data } = await axios(axiosOptions);
      if (data.message === 'All repos successfully checked for update')
        await this.fetchRepos();
    },
    async addTask(formData, files) {
      try {
        // Sending the files to the server first
        const response = await axios({
          method: 'POST',
          url: `${serverUrl}/files`,
          data: files,
          headers: {
            access_token: localStorage.access_token || sessionStorage.access_token,
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.status !== 201)
          throw { response };
        // We need the ids of these uploaded files
        const additionalFiles = response.data.files.map(file => file.id);
        formData.additionalFiles = additionalFiles;
        // Send database data now
        const axiosOptions = {
          method: 'POST',
          url: `${serverUrl}/tasks`,
          data: formData,
          headers: {
            access_token: localStorage.access_token || sessionStorage.access_token
          }
        };
        const { data } = await axios(axiosOptions);
        // Everything should be fine if we arrive here
        showSuccess(data);
        this.router.push('/tasks');
      } catch (err) {
        if (err.response)
          return showError(err.response.data);
        showError(err);
      }
    },
    async startTask(taskId) {
      try {
        const axiosOptions = {
          method: 'POST',
          url: `${serverUrl}/tasks/${taskId}`,
          headers: {
            access_token: localStorage.access_token || sessionStorage.access_token
          }
        };
        const response = await axios(axiosOptions);
        if (response.status !== 204) {
          throw { response };
        }
        showSuccess({ message: 'Task started successfully' });
      } catch (err) {
        if (err.response)
          return showError(err.response.data);
        showError(err);
      }
    },
    async checkTask(taskId) {
      try {
        const axiosOptions = {
          method: 'GET',
          url: `${serverUrl}/tasks/${taskId}/status`,
          headers: {
            access_token: localStorage.access_token || sessionStorage.access_token
          }
        };
        const { data } = await axios(axiosOptions);
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