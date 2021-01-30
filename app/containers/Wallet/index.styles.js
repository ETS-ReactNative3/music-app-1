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
        fontSize: 26,
        marginTop: 30
    },
    subHeaderTitle: {
        color: 'lightgrey',
        fontSize: 18
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
    addWithdrawalContainer: { padding:20 ,marginLeft: 10, marginRight: 10, border: 1, borderColor: 'black', borderStyle: 'solid' },
    summaryCardStyle: {  color: 'black', padding: 20, marginTop: 140, width: '60%' },
    labelCeditText: {fontSize: 14, color: 'grey'},
    labelCeditValueText: {fontSize: 14, color: 'grey', marginRight: 20},
    creditParentStyle: {display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 10}
}

export default styles;