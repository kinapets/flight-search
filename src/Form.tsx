import * as React from 'react';
import {Form, DatePicker, Button} from 'antd';
import {FormComponentProps} from 'antd/lib/form';
const FormItem = Form.Item;

class TimeRelatedForm extends React.Component {
    props: FormComponentProps;
    handleSubmit = (event: any) => {
        event.preventDefault();

        this.props.form.validateFields((err: any, fieldsValue: any) => {
            if (err) {
                return;
            }

            const values = {
                ...fieldsValue,
                'date-picker': new Date(fieldsValue['date-picker'].format('YYYY-MM-DD')),
            };
            console.log(values);
        });
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
        const config = {rules: [{type: 'object', required: true, message: 'Please select time!'}]};

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="DatePicker">
                    {getFieldDecorator('date-picker', config)(<DatePicker />)}
                </FormItem>

                <FormItem wrapperCol={{xs: {span: 24, offset: 0},sm: {span: 16, offset: 8},}}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>
            </Form>
        );
    }
}
export default Form.create()(TimeRelatedForm);