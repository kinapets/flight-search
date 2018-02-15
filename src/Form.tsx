import * as React from 'react';
import {Form, DatePicker, Button, AutoComplete} from 'antd';
import {FormComponentProps} from 'antd/lib/form';

const FormItem = Form.Item;

class SearchForm extends React.Component {
    state = {
        results: []
    }

    props: FormComponentProps;
    handleSubmit = (event: any) => {
        event.preventDefault();

        this.props.form.validateFields((err: any, fieldsValue: any) => {
            if (err) {
                return;
            }

            const values = {
                ...fieldsValue,
                'date-picker': new Date(fieldsValue['date'].format('YYYY-MM-DD')),
            };
            console.log(values);
        });
    }
    handleSearch = (value: string) => {
        let results: any;
        if (!value || value.indexOf('@') >= 0) {
          results = [];
        } else {
          results = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
        }
        this.setState({ results });
      }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const config = {rules: [{required: true, message: 'Please select time!'}]};
        const configDate = {rules: [{type: 'object', required: true, message: 'Please select time!'}]};

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="From">
                    {getFieldDecorator('from', config)(
                        <AutoComplete
                            dataSource={this.state.results}
                            style={{width: 171}}
                            onSearch={this.handleSearch}
                        />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="To">
                    {getFieldDecorator('to', config)(
                        <AutoComplete
                            dataSource={this.state.results}
                            style={{width: 171}}
                            onSearch={this.handleSearch}
                        />
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label="Date">
                    {getFieldDecorator('date', configDate)(<DatePicker />)}
                </FormItem>

                <FormItem wrapperCol={{xs: {span: 24, offset: 0}, sm: {span: 16, offset: 8}, }}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>
            </Form>
        );
    }
}
export default Form.create()(SearchForm);