import chatPusher from 'react-pusher-hoc';

const ItemList = ({ items }) => (
  <ul>
    {items.map(item => <span key={item}>{item}</span>)}
  </ul>
);

const mapEventsToProps = {
  mapPropsToValues: props => ({
    items: [],
  }),
  events: {
    'itemChannel.add': (item, state, props) => ({
      items: state.items.concat(item),
    }),
  }
};

export default chatPusher(mapEventsToProps)(ItemList);