import React, {useState} from "react";
import cn from 'classnames'
import './style.css';

const TableSelect = ({options, defaultValue, setFilter, name, value}) => {
    const [active, setActive] = useState(false);
    const [selectedValue, setSelectedValue] = useState(`${defaultValue}`)
    const stylesOptions = cn('selector__options', {selector__options_active: active})
    const stylesSelected = cn('selector__option_default-selected', {selector__option_selected: selectedValue !== defaultValue})

    const showOptions = () => {
        setActive(!active);
    }

    const setSelected = (option) => {
        setSelectedValue(option.name)
        setActive(false)
        setFilter(option.value)
    }

    const closeSelector = () => {
        setActive(false)
    }

    return (
        <div>
            <div className='selector__box'>
                <div className={stylesOptions}>
                    {options.map(option =>
                        <div key={option.value} className='selector__option' onClick={() => setSelected(option)}>
                            <input
                                className='selector__radio'
                                type='radio'
                                name={name}
                                key={option.value}
                                id={option.value}
                            />
                            <label className='selector__label' htmlFor={option.value}>{option.name}</label>
                        </div>
                    )}
                </div>
                <div
                    data-filter-name={value}
                    className={stylesSelected}
                    onClick={showOptions}
                >
                    {selectedValue}
                </div>
                {active && <div className='selector__background' onClick={closeSelector}></div>}
            </div>
        < /div>
    );
};

export default TableSelect;