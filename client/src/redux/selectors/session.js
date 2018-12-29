export default {
    isLoggedIn: state => {
        return !!state.session.currentUserId;
    },
    loginStatusConfirmed: state => {
        return !!state.session.loginStatusConfirmed;
    }
};