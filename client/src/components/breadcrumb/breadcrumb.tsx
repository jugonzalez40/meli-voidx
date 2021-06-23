import React, { Component } from 'react';
import './breadcrumb.scss';

const BreadDivider = () => (
    <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <g fill="#666666" fill-rule="evenodd">
            <path d="M6.646 5.354l4 4 .354.353.707-.707-.353-.354-4-4L7 4.293 6.293 5z"></path>
            <path d="M7.354 13.354l4-4L11.707 9 11 8.293l-.354.353-4 4-.353.354.707.707z"></path>
        </g>
    </svg>);

type BreadcrumbProps = {
    categories: Array<string>
}

export default class Breadcrumb extends Component<BreadcrumbProps> {
    render() {
        return (<>
            <div className="meli-breadcrumb">
                <span>
                    {
                        this.props.categories.map((category, index) => (
                            <span key={`cat_${index}`}>
                                {category}
                                {index !== this.props.categories.length-1 && <BreadDivider />} 
                            </span>))
                    }
                </span>
            </div>
        </>);
    }

}