/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/react/ssr-apis/
 */

// You can delete this file if you're not using it
import LogRocket from 'logrocket';
export const onClientEntry = () => {
    LogRocket.init(process.env.GATSBY_LOGROCKET);
}