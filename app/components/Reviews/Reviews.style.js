const styles = {
  container: { display: 'flex', flexDirection: 'row', margin: 10 },
  textStyle: { fontSize: 14, fontFamily: 'Roboto-Medium', color: 'white' },
  secondTextStyle: { fontSize: 14, fontFamily: 'Roboto-Regular' },
  profileStyle: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 20,
  },
  contentStyle: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
    marginLeft: 10,
  },
  nameStyle: { fontSize: 14, fontFamily: 'Roboto-Medium', color: 'white' },
  timeStyle: {
    fontSize: 14,
    marginLeft: 10,
    fontFamily: 'Roboto-Regular',
    color: 'green',
  },
  messageStyle: {
    padding: 5,
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: '#0053A5',
  },
  messageTextStyle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: 'white',
  },
  reviewContainer: {
    // backgroundColor: '#121212',
    display: 'flex',
    flex: 1,
  },
  header: {
    backgroundColor: '#222325',
  },
  center: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleStyle: {
    color: 'white',
  },
};
export default styles;
