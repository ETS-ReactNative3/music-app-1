const styles = {
    tabContainer: {
        backgroundColor: '#e5e5e5',
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabItem: {
        color: 'black',
        marginLeft: 20,
        marginRight: 20,
        cursor: 'pointer'
    },
    activeTabItem: {
        color: 'orange'
    },
    headerTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 30
    },
    subHeaderTitle: {
        color: 'lightgrey',
        fontSize: 16
    },
    withdrawalOptionContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: 1,
        borderColor: 'black',
        padding: 10,
        paddingLeft: 30,
        borderStyle: 'solid',
        margin: 10,
        cursor: 'pointer'
    },
    addWithdrawalOptionContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        
        padding: 10,
        paddingLeft: 30,
       
        margin: 10,
        cursor: 'pointer'
    },
    addWithdrawalContainer: { padding:20 ,marginLeft: 10, marginRight: 10, border: 1, borderColor: 'black', borderStyle: 'solid' }
}

export default styles;