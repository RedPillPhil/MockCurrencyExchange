import React, {Component} from 'react';
import {connect} from 'react-redux';

import OrderList from '../components/OrderList';
import {format} from "d3-format";
import {timeFormat} from 'd3-time-format';

const timeFormatter = timeFormat('%H:%M:%S');

function orderHistoryFormatter(column, data) {
	switch (column) {
		case 'type': return data.buy ? 'buy' : 'sell';
		case 'price': return format("(.2f")(data[column]);
		case 'amount': return format("(.4f")(data.quantity);
		case 'time': return timeFormatter(new Date(data[column] * 1000));
		default: return null;
	}
}

@connect((store) => {
	return {
		order_history: store.market_data.history
	};
})
export default class OrderHistory extends Component {
	shouldComponentUpdate(nextProps) {
		return nextProps.order_history !== this.props.order_history;
	}

	render() {
		if (!this.props.order_history) return <p>Loading...</p>;
		return <div className="orders-history-panel">
			<h3 className="panel-title text-center">Last Trades</h3>
			<table className="table order-table">
				<tbody>
					<tr>
						<th>Price</th>
						<th>Amount</th>
						<th>Time</th>
					</tr>
				</tbody>
			</table>
			<OrderList typeField="type" dataFormatter={orderHistoryFormatter} columns={['price', 'amount', 'time']} data={this.props.order_history}/>
		</div>;
	}
}