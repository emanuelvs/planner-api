import App from './app';

const PORT = process.env.PORT || '8080'

App.get().listen(PORT, () => {
    console.log(`Server is running on: ${PORT}`);
})