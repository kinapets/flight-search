import * as React from 'react';
import {Form, DatePicker, Button, AutoComplete} from 'antd';
import {FormComponentProps} from 'antd/lib/form';
import * as api from './api.service';
import {BehaviorSubject} from 'rxjs'
import * as _ from 'lodash';
const FormItem = Form.Item;

interface SearchFormProps extends FormComponentProps {
    handleSubmit: Function;
}

export interface SearchFormData {
    from: string;
    to: string;
    date: Date;
}

class SearchForm extends React.Component<SearchFormProps, {}> {
    state = {results: []}
    props: SearchFormProps;
    behaviourSubject = new BehaviorSubject<string>('');

    constructor(props: SearchFormProps) {
        super(props);
        this.behaviourSubject
            .debounceTime(500)
            .subscribe((value: string) => {
                api.getLocations(value).subscribe((res) => {
                    const results = res.data.locations.map((location) => `${location.name}`);
                    this.setState({results: _.uniq(results)});
                })
            })
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        this.props.form.validateFields((err: any, fieldsValue: any) => {
            if (err) {
                return;
            }
            const values = {...fieldsValue,date: new Date(fieldsValue['date'].format('YYYY-MM-DD'))};
            this.props.handleSubmit(values);
        });
    }

    handleSearch = (value: string) => {
        if (!value || value.indexOf('@') >= 0) {
            this.setState({results: []});
        } else {
            this.behaviourSubject.next(value);
        }
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