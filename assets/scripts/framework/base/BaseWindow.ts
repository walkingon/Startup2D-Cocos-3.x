import { Component } from 'cc';

export abstract class BaseWindow extends Component {

    abstract onOpen(arg?: any): void;
}