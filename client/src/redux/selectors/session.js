export default {
    isLoggedIn: state => {
        return !!state.session.currentUserId;
    }
};