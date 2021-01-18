export const style1 = {
    display: 'flex',
    flex: 1,
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    margin: 0,
    padding: 0,
    backgroundColor: 'white'
}

export const style2 = {
    flex: 1,
    textAlign: 'center'
}

export const styles = {
    container: {
        margin: 20
    },
    section: {
        border: 1,
        backgroundColor: 'white',
        borderStyle: 'solid',
        color: 'black', 
        padding: 10
    },
    selectedSongParent: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row'
    },
    songInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 10
    },
    blurStyle: {
        opacity: 0.5,
        pointerEvent: 'none'
    },
    socialMediaItems: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        padding: 10,
        marginTop: 10,
        marginBottom: 20
    },
    marginHorizontal: {
        marginLeft: 10,
        marginRight: 10,
        cursor: 'pointer'
    },
    shareLinkStyle: {
        display: 'flex',
        flex: 1,
        width: '100%',
        flexDirection: 'column',

    },
    socialMediaItem: {
        paddingRight: 10,
        // width: '50%',
        marginTop: 10,
        marginBottom: 10
    }
}