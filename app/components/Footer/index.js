import React, { Component } from 'react'
import AudioPlayer from 'react-h5-audio-player';

import 'react-h5-audio-player/lib/styles.css';

const playlist = [
  { name: '枝芽', src: 'https://hanzluo.s3-us-west-1.amazonaws.com/music/zhiya.mp3' },
  { name: '自由女神', src: 'https://hanzluo.s3-us-west-1.amazonaws.com/music/ziyounvshen.mp3' },
  { name: '无雨无晴', src: 'https://hanzluo.s3-us-west-1.amazonaws.com/music/wuyuwuqing.mp3' },
  { name: '碎片', src: 'https://hanzluo.s3-us-west-1.amazonaws.com/music/suipian.mp3' },
  { name: '永恒的港湾', src: 'https://hanzluo.s3-us-west-1.amazonaws.com/music/yonghengdegangwan.mp3' },
]


class Footer extends Component {
  constructor(props) {
    super(props);
    this.audio = React.createRef();
  }
  state = {
    currentMusicIndex: 0,
    playing: false
  }

  handleClickPrevious = () => {
    this.setState((prevState) => ({
      currentMusicIndex: prevState.currentMusicIndex === 0 ? playlist.length - 1 : prevState.currentMusicIndex - 1,
    }))
  }

  handleClickNext = () => {
    this.setState((prevState) => ({
      currentMusicIndex: prevState.currentMusicIndex < playlist.length - 1 ? prevState.currentMusicIndex + 1 : 0,
    }))
  }

  toggle = () => {
    !this.state.playing ? this.audio.current.audio.current.play() : this.audio.current.audio.current.pause();
    this.setState({
      playing: !this.state.playing
    })
    
  }

  render() {
    const { currentMusicIndex } = this.state
    return (
      
<footer>
	<div class="footer-left">
    	<a href="#"><img src={require('./../../images/footer-nav-icon.png')} alt="" /></a>
    </div>
    
    <div class="footer-center">
    	<hgroup>
        	<h5>Break Down the Walls</h5>
            <h6>asking alexandria</h6>
        </hgroup>
        
        <div class="play-area">
        	<a href="#"><img src={require('./../../images/play-left.png')} alt=""/></a>
            <a href="#"><img src={require('./../../images/pause.png')} alt=""/></a>
            <a href="#"><img src={require('./../../images/play-right.png')} alt=""/></a>
        </div>
    </div>
    
    <div class="footer-right">
    	<a href="#"><img src={require('./../../images/footer-sound-icon.png')} alt="" /></a>
    </div>
</footer>
      // <div>
      //   <p>currentMusicIndex: {currentMusicIndex}</p>
      //   <div>
      //     <button onClick={this.toggle}>Play/Paus</button>
      //   </div>
      //   <AudioPlayer
      //     ref={this.audio}
      //     customAdditionalControls={[]}
      //     src={playlist[currentMusicIndex].src}
      //     onClickPrevious={this.handleClickPrevious}
      //     onClickNext={this.handleClickNext}
      //   />
      // </div>
    )
  }
}

export default Footer

// import React, { useRef } from 'react';
// import { FormattedMessage } from 'react-intl';
// import AudioPlayer from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';

// import A from 'components/A';
// import LocaleToggle from 'containers/LocaleToggle';
// import Wrapper from './Wrapper';
// import messages from './messages';

// const Footer = () => {

//   const ref = useRef(null);

//   const header = (
//     <div>
//       <h3>Title</h3>
//       <h6>Artist Name</h6>
//     </div>
//   )
  
//   return (
//     <Wrapper>
//       <AudioPlayer
//         footer={header}
//         customAdditionalControls={[]}
//         src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
//         onPlay={e => console.log('onPlay')}
//       />
//     </Wrapper>
//   //   <Wrapper>
//   //     <AudioPlayer
//   //   autoPlay
//   //   src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
//   //   onPlay={e => console.log("onPlay")}
//   //   // other props here
//   // />
//   //     <section>
//   //       <FormattedMessage {...messages.licenseMessage} />
//   //     </section>
//   //     <section>
//   //       <LocaleToggle />
//   //     </section>
//   //     <section>
//   //       <FormattedMessage
//   //         {...messages.authorMessage}
//   //         values={{
//   //           author: <A href="https://twitter.com/mxstbr">Max Stoiber</A>,
//   //         }}
//   //       />
//   //     </section>
//   //   </Wrapper>
//   );
// }

// export default Footer;


