import { Component } from 'cc';

export abstract class BasePage extends Component {

    abstract onOpen(arg?: any): void;
}