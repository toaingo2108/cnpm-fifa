export const apiUrl =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5000/api'
        : 'https://obscure-meadow-86352.herokuapp.com/api'

export const LOCAL_STORAGE_TOKEN_NAME = 'user-token-qldb'