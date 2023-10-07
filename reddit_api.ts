/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios, { type AxiosResponse } from 'axios'

// Define your Reddit API credentials
const CLIENT_ID = 'XkwiZe6mS5dwEipkuirAzw'
const CLIENT_SECRET = '0qYC06eDF8l0uobalU-tNEXqsJO31g'
const REDDIT_USERNAME = 'bigt_1991'
const REDDIT_PASSWORD = 'NCF?@769&eRzUhg,'

// Encode Reddit API credentials for authentication
const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')

// Create a function to obtain an access token
async function getAccessToken () {
  try {
    const response: AxiosResponse<any> = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      `grant_type=password&username=${REDDIT_USERNAME}&password=${REDDIT_PASSWORD}`,
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'bigt_1991'
        }
      }
    )

    const accessToken = response.data.access_token
    console.log('Response:', response)
    console.log('Access Token:', accessToken)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // This block executes if 'error' is an AxiosError
      console.error('Axios Error:', error.response?.data)
    } else {
      // This block executes if 'error' is of unknown type
      console.error('Unknown Error:', error)
    }
  }
}

// Call the function to obtain an access token
void getAccessToken()
