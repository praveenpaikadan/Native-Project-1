// import React, { useContext, useState, useEffect } from "react";
// import YouTube from "react-native-youtube"
// import { YouTubeStandaloneAndroid } from 'react-native-youtube';

// export default YoutubePlayer = () => {

//     const [ready, setReady] = useState(false)    
//     const [state, setState] = useState(null)

//     // return(
//     //     YouTubeStandaloneAndroid.playVideo({
//     //         apiKey: 'YOUR_API_KEY', // Your YouTube Developer API Key
//     //         videoId: 'KVZ-P-ZI6W4', // YouTube video ID
//     //         autoplay: true, // Autoplay the video
//     //         startTime: 120, // Starting point of video (in seconds)
//     //       })
//     // )

//     return(
//         <YouTube
//         apiKey="AIzaSyAY3PEfaet1vlcFliUp7eqZr3M6cXz0MEE"
//         videoId="KVZ-P-ZI6W4" // The YouTube video ID
//         play={true} // control playback of video with true/false
//         fullscreen={false} // control whether the video should play in fullscreen or inline
//         loop={false} // control whether the video should loop when ended
//         onReady={e => setReady(true)}
//         // onChangeState={e => this.setState({ status: e.state })}
//         // onChangeQuality={e => this.setState({ quality: e.quality })}
//         onError={e => console.log(error)}
//         style={{ alignSelf: 'stretch', height: 300 }}
//     />
//     )
// }

