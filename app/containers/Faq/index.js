import React, {useState} from 'react';
import PaperCard from "../../components/PaperCard";
import {Col, Nav, NavItem, NavLink, Row, Tab, TabContent, TabPane} from "react-bootstrap";
import AppCollapse from "../../components/AppCollapse/Loadable";
import {
  faAddressBook,
  faBoxOpen, faBullhorn, faCoins,
  faDollarSign,
  faGuitar,
  faHandHoldingUsd,
  faMusic,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./index.scss";

function Faq() {
  const dataToRender = []
  const data = {

    // payment
    potentiam: {
      icon: faMusic,
      title: 'Bliiink',
      subtitle: '',
      qandA: [
        {
          question: 'What is Bliiink?',
          ans:
            '<p>Bliiink Music is a community of artists, influencers, and music lovers who connect with the power of fresh music. We bring opportunities for upcoming talented artists while supporting the creative needs of our influencers.</p>'
        },
        {
          question: 'Getting Started',
          ans:
            '<p>Becoming a part of a music community that is truly on your side is just one step away. Get started by creating an account.</p>' +
            '<p>Once logged in, you can edit your profile as you wish. Just click on the top right-hand button.</p>' +
            '<p>If you think you have what it takes to influence people\'s music listening habits, apply to become a <a href="https://open.bliiink.co.uk/tasteMaker/request/form" target="_blank">music tastemaker</a> on Bliiink.</p>' +
            '<p>Otherwise, enjoy discovering and connecting to new artists.</p>'
        },
        {
          question: 'Discover & Connect',
          ans: '<p>Jump right in and start discovering new music. We have featured and weekly top track columns which are decided by the community. To ensure a fair system we have a new releases column.</p>' +
            '<p>In the Browse music tab, we have classified music into genres and moods to make it easy to discover new artists and songs.</p>' +
            '<p>Like &#10084;&#65039;  your favourite songs to save them to your library. You also have the option to save artists to your library.<br> Or simply create playlists.</p>' +
            '<p>If you like what you are listening to, be sure to <a href="https://open.bliiink.co.uk/subscription-plans" target="_blank">subscribe</a>. Subscription payments go directly into the artist\'s payment pool and further development of the platform.<br>Only paid subscription fans can choose their favorite artists to support. Thereby directing a portion of their subscription directly to the artist.</p>'+
            '<p>Also, paying fans get entered into weekly draws and other promotional events.</p>'
        },
      ]
    },
    // delivery
    delivery: {
      icon: faGuitar,
      title: 'Artist Account',
      subtitle: '',
      qandA: [
        {
          question: 'How to create an album and upload songs on Bliiink?',
          ans: '<p>Create an artist account, and complete your profile adding as much detail as possible. \n' +
            'Next <a href="https://open.bliiink.co.uk/songList" target="_blank">upload the songs</a> you would like to promote, filling the required information, then add it into your <a href="https://open.bliiink.co.uk/album/add" target="_blank">album</a>, also adding as many details as possible to publish it.</p>'
        },
        {
          question: 'How to select tastemakers on Bliiink?',
          ans: '<p>Go to <a href="https://open.bliiink.co.uk/songList" target="_blank">my song</a> tab, and after choosing a song to promote you will be provided with a selection of tastemakers. We’ve provided search parameters to navigate finding tastemakers that fit your style of music!</p>' +
            '<p>If you see a tastemaker you like, submit your song! Once you submit your song, your funds are held until the tastemaker selected completes the task. If the task is not completed, the funds will be sent back to you.</p>' +
            '<p>You will be notified by our system if your song has been accepted to be shared by a tastemaker. To follow the progress click on the campaign tab on the left-hand section of the screen. Please pay close attention to the messages here, and respond as required.</p>'+
            '<p>Remember to reshare your content with your audience so they can come to see you grow and support you on Bliiink.</p>'
        },
        {
          question: 'How many songs can i upload?',
          ans:
            '<p>You have unlimited uploads if you are on one of our subscription payment plans.\n' +
            'However, if you cancel your subscription, you will be restricted to the initial two-song uploads. And we will hide other songs from view.</p>' +
            '<p>Only artists with a paid subscription plan can monetise their songs on Bliiink.</p>'
        },
        {
          question: 'What type of file can I upload?',
          ans:
            '<p>We recommend you upload in a lossless format like WAV, FLAC, AIFF, or ALAC. We also support a large variety of lossy formats, including OGG, MP2, MP3, AAC, AMR, and WMA.  We allow up to 200Mb track file sizes.</p>'
        },
      ]
    },
    royalties: {
      icon: faHandHoldingUsd,
      title: 'Royalties',
      subtitle: 'Coming soon!',
      qandA: []
    },
    // cancellation and return
    payment: {
      icon: faBullhorn,
      title: 'Tastemaker',
      subtitle: '',
      qandA: [
        {
          question: 'Become a Tastemaker on BLIIINK',
          ans:
            '<p>If you are passionate about discovering new music and sharing it with your army of loyal followers, join BLIIINK as a tastemaker.</p>'+
            '<p>First, create an account as a regular user, then apply to become a tastemaker by clicking the  tab with your name and profile image on the top right-hand corner of the screen. Then click my profile tab.</p>'+
            '<p>Please fill in all the required fields carefully and fill in as much information as you can, the more detailed the better.</p>'+
            '<p>As submissions come in, review the music and make a call. You have to listen for at least 30 seconds, and you have 10 days to accept or decline. However, it’s best to make a decision quickly. You will get alert emails each time! <strong>(friendly note: You do not receive payment for declined offers)</strong></p>'+
            '<p>If you do decide to share a song with your network, remember to add the link as proof of the task being completed.</p>'
        }
      ]
    },
    // my orders
    myOrders: {
      icon: faCoins,
      title: 'Credits',
      subtitle: '',
      qandA: [
        {
          question: 'BLIIINK cr & Tokens',
          ans:
            'Bliiink Cr & tokens are the in-app currency used in the Bliiink community.'
        },
        {
          question: 'Purchasing BLIIINK credits',
          ans:
            '<p>BLIIINK Credits can be purchased by clicking your profile picture on the top right-hand corner of the home screen and then clicking on the wallet tab. \n' +
            'Purchase Credits <a href="https://open.bliiink.co.uk/wallet" target="_blank">HERE</a>.</p>' +
            '<p>Upon completing the payment, Credits will immediately be placed in that user\'s BLIIINK wallet and may be used to patron artists.</p>'+
            '<p><strong>Please note: All purchases made through the BLIIINK platform are non-refundable.</strong></p>'
        },
        {
          question: 'Earning BLIIINK Tokens',
          ans:
            '<p>Users can earn free BLIIINK tokens as rewards, through engagement on the platform. \n' +
            '<strong>More information is coming soon, also join our <a href="https://discord.com/invite/6NndvkFWYq" target="_blank">discord group</a> for making key decisions on the platform.</strong></p>'+
            '<p>For any questions or issues purchasing or earning Bliiink tokens please contact support@bliiink.co.uk</p>'
        },
        {
          question: 'Withdrawing BLIIINK credits',
          ans:
            '<p>Click on your profile picture on the top right-hand corner of the home screen and then click on the transactions tab.</p>'+
            '<p>Withdraw Credits <a href="https://open.bliiink.co.uk/wallet/withdrawal" target="_blank">HERE</a>.</p>'+
            '<p>Only earned credits/tokens are eligible for withdrawals.</p>'+
            '<p><strong>Please note: All purchases made through the BLIIINK platform are non-refundable.</strong></p>'
        }
      ]
    },
    contact: {
      icon: faAddressBook,
      title: 'Contact & Account Help',
      subtitle: '',
      qandA: [
        {
          question: 'Trouble Logging In?',
          ans:
            '<p>Have trouble logging in? Click <a href="https://open.bliiink.co.uk/auth/forgot-password" target="_blank">HERE</a> to reset your password. Make sure that you are using the same email address you used to create your BLIIINK account. You can also click “Forgot Password” on BLIIINK’s login screen.</p>'+
            '<p>If you require assistance please contact support@bliiink.co.uk</p>'
        },
        {
          question: 'Contact Bliiink Support',
          ans:
            '<p>We are here to help with any questions you may have! For general inquiries, support, and copyright information please contact us at one of the below, relevant addresses. We will respond to your inquiry in a timely manner!</p>'
        },
        {
          question: 'For General Inquiries',
          ans:
            '<p>Feedback, business inquiries, and more information.</p>'+
            '<p>info@bliiink.co.uk<br>artistshub@bliiink.co.uk<br>tastemakershub@bliiink.co.uk</p>'
        },
        {
          question: 'For Support',
          ans:
            '<p>General support, account help, and payment processing.</p>'+
            '<p>support@bliiink.co.uk<br>artistshub@bliiink.co.uk<br>tastemakershub@bliiink.co.uk</p>'
        },
        {
          question: 'For Copyright Claims',
          ans:
            '<p>Copyright infringement claims.</p>'+
            '<p>copyright@bliiink.co.uk</p>'
        }
      ]
    }
  }

  const [activeTab, setActiveTab] = useState('Bliiink')

  const toggleTab = tab => setActiveTab(tab)


  Object.entries(data).forEach(([key, val]) => {
    dataToRender.push(val)
  })


  const renderTabs = () => {
    return dataToRender.map(item => {
      return (
        <NavItem key={item.title} tag='li'>
          <NavLink eventKey={item.title} active={activeTab === item.title} onSelect={(event) => toggleTab(event)}>
            <FontAwesomeIcon icon={item.icon} className="mr-2"/>
            <span className='font-weight-bold'>{item.title}</span>
          </NavLink>
        </NavItem>
      )
    })
  }

  const renderTabContent = () => {
    return dataToRender.map(item => {
      return (
        <TabPane eventKey={item.title}>
          <div className='d-flex align-items-center'>
            <div className='avatar avatar-tag bg-light-primary mr-1'>
              <FontAwesomeIcon icon={item.icon} className="mr-2"/>
            </div>
            <div>
              <h4 className='mb-2'>{item.title}</h4>
              <span>{item.subtitle}</span>
            </div>
          </div>
          <AppCollapse
            className='mt-2'
            type='margin'
            data={item.qandA}
            titleKey='question'
            contentKey='ans'
            accordion
            {...(item.title === 'Payment' ? {active: 1} : {})}
          />
        </TabPane>
      )
    })
  }

  return (
    <PaperCard title="FAQ">
      <div id='faq-tabs'>
        <Row>
          <Col lg='3' md='4' sm='12'>
            <div className='faq-navigation d-flex justify-content-between flex-column mb-2 mb-md-0'>
              <Nav tag='ul' className='nav-left flex-column' pills vertical>
                {renderTabs()}
              </Nav>
            </div>
          </Col>
          <Tab.Container id="left-tabs-example" defaultActiveKey={activeTab} activeKey={activeTab}>
            <Col lg='9' md='8' sm='12'>
              <TabContent>{renderTabContent()}</TabContent>
            </Col>
          </Tab.Container>
        </Row>
      </div>
    </PaperCard>
  );
}

export default Faq;
