import * as prismic from '@prismicio/client'

// Fill in your repository name
export const repositoryName = '4khd'
const accessToken = process.env.NEXT_PUBLIC_PRISMIC_ACCESS_TOKEN
console.log('✌️accessToken --->', accessToken);

export const client = prismic.createClient(repositoryName, {
  // If your repository is private, add an access token
  accessToken,
})