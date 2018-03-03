'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
	initializing() {
		this.globalStore = this.options.__store;
	}

	prompting() {
		const prompts = [
			{
				type: 'checkbox',
				name: 'postCSS',
				message: 'Which PostCSS plugins do you want to use?',
				choices: [
					{
						name: 'Autoprefixer',
						value: 'autoprefixer',
						checked: true
					},
					{
						name: 'CSS Separator',
						value: 'postCssSeparator'
					},
					{
						name: 'CSS Next',
						value: 'cssNext'
					}
				],
				default: [ 'autoprefixer' ]
			}
		];

		return this.prompt(prompts).then(props => {
			this.props = props;
		});
	}

	configuring() {
		if (this.globalStore) {
			this.globalStore.set('postCSS', this.props.postCSS);
		} else {
			this.config.set('postCSS', this.props.postCSS);
		}
	}
};
