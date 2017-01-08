import React, {Component} from 'react'
import {Uploader, EditorImage, Translate, BSFormField} from '..'
import actions from '../../store/actions'
import store from '../../store'
import axios from 'axios'
import {Grid, Row, Col} from 'react-bootstrap';
import {bind, formula} from '../../core/utils';

const {createOrUpdate} = actions.items;
const {addToastMessage} = actions.notifications

export class ItemForm extends Component {
    constructor(args) {
        super(args)
        this.state = {
            files: [],
            ...this.props
        };
        bind(this, 'handleChanges', 'submit', 'fileUploaded', 'fetchItem');
        this.fetchItem();
    }

    willReceiveProps(newProps) {
        this.setState({
            name: 'Loading...',
            files: [],
            ...newProps
        });
        this.fetchItem();
    }

    fetchItem(props) {
        const {_id} = this.props;
        if (_id) {
            axios
                .get('/api/admin/item/' + _id)
                .then(xhr => {
                    this.setState(xhr.data);
                });
        }
    }

    handleChanges(ev) {
        ev.preventDefault();
        this.setState({
            [ev.target.name]: ev.target.value
        });
    }

    submit(e) {
        e.preventDefault();
        createOrUpdate(this.state);
    }

    fileUploaded(response) {
        this.setState({
            files: [
                ...this.state.files,
                response.filename
            ]
        });
        addToastMessage({message: `"${response.originalname}" a bien été téléchargée`, type: 'success'});
    }

    getSpaces() {
        const {session} = store.getState();
        return session.spaces || [];
    }

    render() {
        const {_id} = this.props;
        const spaces = this.getSpaces();
        const formulaEval = formula(this.state.price, {});
        const formulaState = formulaEval.isValid
            ? 'info'
            : 'warning';
        const {
            space = spaces[0],
            name,
            shortDescription,
            description,
            price = 0,
            labels = [],
            options = [
                {
                    code: 'size',
                    label: 'Size',
                    options: [
                        {
                            code: 'small',
                            mod: -1.5
                        }, {
                            code: 'medium',
                            mod: 0
                        }, {
                            code: 'large',
                            mod: 2
                        }
                    ]
                }, {
                    code: 'color',
                    label: 'Colors',
                    options: [
                        {
                            code: 'red',
                            mod: 0
                        }, {
                            code: 'blue',
                            mod: 0
                        }, {
                            code: 'sparkling',
                            mod: 2
                        }
                    ]
                }
            ],
            files = []
        } = this.state;
        return (
            <form
                className="form-horizontal well"
                onChange={this.handleChanges}
                onSubmit={this.submit}>
                <fieldset>
                    <legend style={{textAlign: 'center'}}>{_id
                            ? (
                                <div>
                                    <Translate content="item_modification"/>{' '}
                                    <small>{_id}</small>
                                </div>
                            )
                            : (<Translate content="item_creation"/>)}</legend>
                        <Row className="show-grid">
                            <Col sm={7} md={8} lg={6}>
                                <BSFormField label={(<Translate content="space_name"/>)} icon="globe">
                                    <select name="space" className="form-control" value={space}>
                                        {spaces.map(space => (
                                            <option value="space" key={space}>{space}</option>
                                        ))}
                                    </select>
                                </BSFormField>
                                <BSFormField label={(<Translate content="product_name"/>)}>
                                    <input
                                        name="name"
                                        placeholder="Blue shirt"
                                        className="form-control"
                                        value={name}
                                        type="text"/>
                                </BSFormField>
                                <BSFormField label={(<Translate content="labels"/>)} icon="tags">
                                    <input
                                        name="labels"
                                        placeholder="men, clothes, summer"
                                        className="form-control"
                                        type="text"
                                        value={'' + (labels || []).join(', ')}/>
                                </BSFormField>
                                <BSFormField label={(<Translate content="product_short_description"/>)}>
                                    <input
                                        name="short_description"
                                        placeholder="Shirt with a unicorn design"
                                        className="form-control"
                                        value={shortDescription}
                                        type="text"/>
                                </BSFormField>
                                <BSFormField label={(<Translate content="product_full_description"/>)}>
                                    <textarea
                                        className="form-control"
                                        name="long_description"
                                        placeholder="This shirt is made of 97% coton and 4% magic"
                                        rows={12}
                                        value={description}></textarea>
                                </BSFormField>
                                <BSFormField label={(<Translate content="width"/>)} icon="resize-horizontal">
                                    <input name="width" placeholder="10cm" className="form-control" type="number"/>
                                </BSFormField>
                                <BSFormField label={(<Translate content="height"/>)} icon="resize-vertical">
                                    <input name="width" placeholder="10cm" className="form-control" type="number"/>
                                </BSFormField>
                                <BSFormField label={(<Translate content="depth"/>)} icon="export">
                                    <input name="width" placeholder="10cm" className="form-control" type="number"/>
                                </BSFormField>
                                <BSFormField label={(<Translate content="weight"/>)} icon="scale">
                                    <input name="weight" placeholder="300g" className="form-control" type="number"/>
                                </BSFormField>
                                {options.map(opt => (
                                    <BSFormField label={(<Translate content="option_groups"/>)} icon="th-list">
                                        <select key={opt.code} name={opt.code} className="form-control">
                                            {opt
                                                .options
                                                .map(o => (
                                                    <option value={o.code} key={`${opt.code}_${o.code}`}>{o.label} {o.mod === 0
                                                            ? null
                                                            : ` (${o.mod})`}</option>
                                                ))}
                                        </select>
                                        <span className="input-group-addon">
                                            {opt.code}
                                        </span>
                                    </BSFormField>
                                ))}
                                <BSFormField
                                    label={(<Translate content="price"/>)}
                                    icon="usd"
                                    message={formulaEval.error}
                                    state={formulaState}>
                                    <input
                                        name="price"
                                        placeholder="(10.15 + size) + qty"
                                        className="form-control "
                                        type="text"
                                        value={price}/>
                                </BSFormField>
                                <BSFormField icon="save">
                                    <button className="btn btn-primary" type="submit">{this.state._id
                                            ? (<Translate content="save_item"/>)
                                            : (<Translate content="create_item"/>)}</button>
                                </BSFormField>
                            </Col>
                            <Col sm={5} md={4} lg={6}>
                                <Uploader url="/api/item/medias" onSuccess={this.fileUploaded}>
                                    <div className="mask">
                                        <div className="banner"><Translate content="drop_image_here" /></div>
                                    </div>
                                </Uploader>
                                <div className="editor-images">
                                    {files.map(id => (<EditorImage
                                        key={'image' + id}
                                        onDestroy={() => console.log('destroy', id)}
                                        onPrimary={() => console.log('make primary', id)}
                                        alt={this.state.name}
                                        src={'../../api/medias/' + id}/>))}
                                </div>
                            </Col>
                        </Row>
                </fieldset>
            </form>
        );
    }
}
