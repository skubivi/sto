export enum EDianosticAnswers {
    Norm = 'Исправно',
    Defect = 'Неисправно'
}

export enum EQuestionType {
    MultiSelect = 'MULTI_SELECT',
    Input = 'INPUT',
    Select = 'SELECT',
    Choise = 'CHOISE',
    InfoSelect = 'INFO_SELECT',
    Final = 'FINAL'
}

export interface TMetallworkerQuestion {
    id: number
    type: EQuestionType,
    docTitle: string
    title: string,
    ok?: string,
    fault?: string,
    options?: string[],
    defectOptions?: string[],
    input?: string,
    photoText?: string
    subQuestion?: {
        title: string
        options: string[]
    }
    skipLogic?: {
        option: string, 
        skipId: number[]
    }[]
}

export const METALWORKER_QUESTIONS: TMetallworkerQuestion[] = [
    {
        id: 0,
        type: EQuestionType.MultiSelect,
        docTitle: 'Щетки стеклоочистителя',
        title: 'Проверьте щетки стеклоочистителя',
        defectOptions: ['Передняя левая', 'Передняя правая', 'Задняя'],
        subQuestion: {
            title: 'Уточните неисправность для ',
            options: ['Мажет', 'Отсутствует']
        }
    },
    {
        id: 1,
        type: EQuestionType.Input,
        title: 'Проверьте подсветку приборов',
        docTitle: 'Подсветка приборов',
        input: 'Укажите, что не горит'
    },
    {
        id: 2,
        type: EQuestionType.MultiSelect,
        title: 'Проверьте лампы неисправности на панели приборов',
        docTitle: 'Лампы приборов на панели приборов',
        ok: 'Не горят',
        fault: 'Горят',
        defectOptions: ['CHECK ENGINE', 'SRS', 'ABS', 'АКБ']
    },
    {
        id: 3,
        type: EQuestionType.Select,
        title: 'Работа стартера при запуске автомобиля',
        docTitle: 'Работа стартера при запуске автомобиля',
        defectOptions: ['Посторонний шум', 'Заклинивание']
    },
    {
        id: 4,
        type: EQuestionType.Select,
        title: 'Работа двигателя',
        docTitle: 'Работа двигателя',
        defectOptions: ['Посторонний шум/гул', 'Посторонний стук', 'Неровная работа/троение']
    },
    {
        id: 5,
        type: EQuestionType.MultiSelect,
        title: 'Габариты',
        docTitle: 'Габариты',
        defectOptions: ['Передний левый', 'Передний правый', 'Задний левый', 'Задний правый']
    },
    {
        id: 6,
        type: EQuestionType.MultiSelect, 
        title: 'Ближний свет', 
        docTitle: 'Ближний свет',
        defectOptions: ['Слева', 'Справа']
    },
    {
        id: 7,
        type: EQuestionType.MultiSelect, 
        title: 'Дальний свет', 
        docTitle: 'Дальний свет',
        defectOptions: ['Слева', 'Справа']
    },
    {
        id: 8,
        type: EQuestionType.MultiSelect, 
        title: 'Противотуманные фары', 
        docTitle: 'Противотуманные фары', 
        defectOptions: ['Передний левый', 'Передний правый', 'Задний левый', 'Задний правый']
    },
    {
        id: 9,
        type: EQuestionType.MultiSelect, 
        title: 'Указатель поворотов', 
        docTitle: 'Указатель поворотов', 
        defectOptions: ['Передний левый', 'Передний правый', 'Задний левый', 'Задний правый', 'Дополнительный слева', 'Дополнительный справа']
    },
    {
        id: 10,
        type: EQuestionType.MultiSelect, 
        title: 'Стоп сигналы',
        docTitle: 'Стоп сигналы', 
        defectOptions: ['Слева', 'Справа', 'Центральный']
    },
    {
        id: 11,
        type: EQuestionType.Input, 
        title: 'Сигнал заднего хода',
        docTitle: 'Сигнал заднего хода',
        input: ''
    },
    {
        id: 12,
        type: EQuestionType.MultiSelect, 
        title: 'Подсветка номера', 
        docTitle: 'Подсветка номера', 
        defectOptions: ['Слева', 'Справа']
    },
    {
        id: 13,
        type: EQuestionType.MultiSelect, 
        title: 'Проверьте состояние приводных ремней', 
        docTitle: 'Состояние приводных ремней',
        defectOptions: ['Ремень генератора', 'Ремень ГУР', 'Ремень кондиционера', 'Ремень помпы'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Отслоения', 'Попадание масла']
        }
    },
    {
        id: 14,
        type: EQuestionType.Select, 
        title: 'Проверьте состояние воздушного фильтра', 
        docTitle: 'Cостояние воздушного фильтра',
        defectOptions: ['Загрязнен', 'Попадание влаги', 'Требуется доп. разбор']
    },
    {
        id: 15,
        type: EQuestionType.Select, 
        title: 'Проверьте состояние салонного фильтра', 
        docTitle: 'Cостояние салонного фильтра',
        defectOptions: ['Загрязнен', 'Попадание влаги', 'Отсутствует', 'Требуется доп. разбор']
    },
    {
        id: 17,
        type: EQuestionType.Select, 
        title: 'Уровень масла двигателя',
        docTitle: 'Уровень масла двигателя',
        defectOptions: ['Ниже уровня', 'Выше уровня']
    },
    {
        id: 18,
        type: EQuestionType.Select, 
        title: 'Состояние масла двигателя',
        docTitle: 'Состояние масла двигателя',
        defectOptions: ['С механическими примесями', 'Следы антифриза', 'Следы воды'], 
        photoText: 'Приложите фото капельного теста',
    },
    {
        id: 19,
        type: EQuestionType.Select, 
        title: 'Уровень масла ГУР',
        docTitle: 'Уровень масла ГУР',
        defectOptions: ['Ниже уровня', 'Выше уровня'], 
    },
    {
        id: 20,
        type: EQuestionType.Select, 
        title: 'Состояние масла ГУР',
        docTitle: 'Состояние масла ГУР',
        defectOptions: ['С механическими примесями', 'Горелое', 'Следы воды'], 
        photoText: 'Приложите фото капельного теста'
    },
    {
        id: 21,
        type: EQuestionType.Select, 
        title: 'Уровень масла АКПП',
        docTitle: 'Уровень масла АКПП',
        defectOptions: ['Ниже уровня', 'Выше уровня', 'Требуется дополнительный разбор' ], 
    },
    {
        id: 22,
        type: EQuestionType.Select, 
        title: 'Состояние масла АКПП', 
        docTitle: 'Состояние масла АКПП',
        defectOptions: ['С механическими примесями', 'Горелое', 'Следы воды'], 
        photoText: 'Приложите фото капельного теста', 
    },
    {
        id: 23,
        type: EQuestionType.Select,
        title: 'Уровень охлаждающей жидкости', 
        docTitle: 'Уровень охлаждающей жидкости',
        defectOptions: ['Ниже уровня', 'Выше уровня'], 
    },
    {
        id: 24,
        type: EQuestionType.Select, 
        title: 'Температура кристаллизации ОЖ (Более 36° - исправно)',
        docTitle: 'Температура кристаллизации ОЖ',
        defectOptions: ['30-35°', '25-30°', 'Менее 25°'], 
    },
    {
        id: 25,
        type: EQuestionType.Select, 
        title: 'Уровень тормозной жидкости',
        docTitle: 'Уровень тормозной жидкости',
        defectOptions: ['Ниже уровня', 'Выше уровня'], 
    },
    {
        id: 26,
        type: EQuestionType.Select, 
        title: 'Содержание влаги в тормозной жидкости (Менее 1% - исправно)', 
        docTitle: 'Содержание влаги в тормозной жидкости',
        defectOptions: ['1%-2%', 'Более 2%'], 
    },
    {
        id: 27,
        type: EQuestionType.InfoSelect, 
        title: 'Укажите привод автомобиля',
        docTitle: '',
        options: ['Передний', 'Задний', 'Полный'], 
        skipLogic: [
            {
                option: 'Передний',
                skipId: [90, 91, 92]
            }, 
            {
                option: 'Задний',
                skipId: [89, 90]
            }
        ]
    },
    {
        id: 28,
        type: EQuestionType.MultiSelect, 
        title: 'Подшипники ступиц передние', 
        docTitle: 'Подшипники ступиц передние',
        defectOptions: ['Левый', 'Правый'], 
        subQuestion: {
            title: 'Уточните неисправность для: ', 
            options: ['Шум', 'Люфт']
        }
    },
    {
        id: 29,
        type: EQuestionType.Select, 
        title: 'Износ передних тормозных дисков', 
        docTitle: 'Износ передних тормозных дисков',
        defectOptions: ['Больший износ слева', 'Больший износ справа'], 
    },
    {
        id: 30,
        type: EQuestionType.Select,
        title: 'Износ передних тормозных дисков (толщина)\nМенее 1мм(<25%) - норма',
        docTitle: 'Износ передних тормозных дисков (толщина)',
        defectOptions: ['1-2мм (25-50%)', '2-3мм (50-75%)', 'Более 3мм (>75%)'], 
    },
    {
        id: 31,
        type: EQuestionType.Select, 
        title: 'Износ передних тормозных колодок', 
        docTitle: 'Износ передних тормозных колодок',
        defectOptions: ['Больший износ слева', 'Больший износ справа'], 
    },
    {
        id: 32,
        type: EQuestionType.Select, 
        title: 'Остаток передних тормозных колодок\nБолее 5мм (<25%) - норма',
        docTitle: 'Остаток передних тормозных колодок',
        defectOptions: ['4-5мм (25-50%)', '3-4мм (50-75%)', 'Менее 3мм (>75%)'],
    },
    {
        id: 33,
        type: EQuestionType.MultiSelect, 
        title: 'Состояние передних тормозных шлангов',
        docTitle: 'Состояние передних тормозных шлангов',
        defectOptions: ['Слева', 'Справа'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Механические повреждения', 'Вздутие', 'Течь']
        }
    },
    {
        id: 34,
        type: EQuestionType.MultiSelect, 
        title: 'Состояние передних тормозных трубок',
        docTitle: 'Состояние передних тормозных трубок',
        defectOptions: ['Слева', 'Справа'], 
        subQuestion: {
            title: 'Уточните неисправность для "{option_text}":', 
            options: ['Механические повреждения', 'Сильная коррозия', 'Течь']
        }
    },
    {
        id: 35,
        type: EQuestionType.Choise, 
        title: 'Износ задних тормозных дисков', 
        docTitle: 'Износ задних тормозных дисков',
        options: ['Равномерный', 'Барабанный тормоз', 'Больший износ слева', 'Больший износ справа'], 
        defectOptions: ['Больший износ слева', 'Больший износ справа'], 
        skipLogic: [{
            option: 'Барабанный тормоз', 
            skipId: [36, 37, 38, 45, 46]
        }],
    },
    {
        id: 36,
        type: EQuestionType.Select, 
        title: 'Износ задних тормозных дисков (толщина)\nМенее 1мм(<25%) - норма',
        docTitle: 'Износ задних тормозных дисков (толщина)',
        defectOptions: ['1-2мм (25-50%)', '2-3мм (50-75%)', 'Более 3мм (>75%)'], 
    },
    {
        id: 37,
        type: EQuestionType.Select, 
        title: 'Износ задних тормозных колодок',
        docTitle: 'Износ задних тормозных колодок',
        defectOptions: ['Больший износ слева', 'Больший износ справа'], 
    },
    {
        id: 38,
        type: EQuestionType.Select, 
        title: 'Остаток задних тормозных колодок\nБолее 5мм (<25%) - норма',
        docTitle: 'Остаток задних тормозных колодок',
        defectOptions: ['4-5мм (25-50%)', '3-4мм (50-75%)', 'Менее 3мм (>75%)'], 
    },
    {
        id: 39,
        type: EQuestionType.MultiSelect, 
        title: 'Состояние задних тормозных шлангов',
        docTitle: 'Состояние задних тормозных шлангов',
        defectOptions: ['Слева', 'Справа'], 
        subQuestion:{
            title: 'Уточните неисправность для ',
            options: ['Механические повреждения', 'Вздутие', 'Течь']
        }
    },
    {
        id: 40,
        type: EQuestionType.MultiSelect, 
        title: 'Состояние задних тормозных трубок', 
        docTitle: 'Состояние задних тормозных трубок',
        defectOptions: ['Слева', 'Справа'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Механические повреждения', 'Сильная коррозия', 'Течь']
        }
    },
    {
        id: 41,
        type: EQuestionType.InfoSelect, 
        title: 'Стояночный тормоз',
        docTitle: '',
        options: [EDianosticAnswers.Norm, EDianosticAnswers.Defect],
        skipLogic: [{
            option: EDianosticAnswers.Norm, 
            skipId: [42, 43, 44, 45, 46]
        }],
    },
    {
        id: 42,
        type: EQuestionType.Select, 
        title: 'Трос стояночного тормоза левый', 
        docTitle: 'Трос стояночного тормоза левый', 
        defectOptions: ['Клинит', 'Порван', 'Растянут', 'Отсутствует']
    },
    {
        id: 43,
        type: EQuestionType.Select, 
        title: 'Трос стояночного тормоза правый', 
        docTitle: 'Трос стояночного тормоза правый', 
        defectOptions: ['Клинит', 'Порван', 'Растянут', 'Отсутствует']
    },
    {
        id: 44,
        type: EQuestionType.Select, 
        title: 'Трос стояночного тормоза центральный', 
        docTitle: 'Трос стояночного тормоза центральный', 
        defectOptions: ['Клинит', 'Порван', 'Растянут', 'Отсутствует']
    },
    {
        id: 45,
        type: EQuestionType.Select, 
        title: 'Суппорт задний левый', 
        docTitle: 'Суппорт задний левый',
        defectOptions: ['Клинят направляющие', 'Клинит поршень']
    },
    {
        id: 46,
        type: EQuestionType.Select, 
        title: 'Суппорт задний правый', 
        docTitle: 'Суппорт задний правый',
        defectOptions: ['Клинят направляющие', 'Клинит поршень']
    },
    {
        id: 47,
        type: EQuestionType.MultiSelect, 
        title: 'Течи моторного масла', 
        docTitle: 'Течи моторного масла',
        ok: 'Нет течи', 
        fault: 'Есть течь', 
        defectOptions: ['Течь клапанной крышки', 'Течь турбокомпрессора', 'Течь поддона', 'Течь переднего сальника КВ', 'Течь заднего сальника КВ', 'Течь охладителя масла']
    },
    {
        id: 48,
        type: EQuestionType.MultiSelect, 
        title: 'Течи масла ГУР', 
        docTitle: 'Течи масла ГУР',
        ok: 'Нет течи', 
        fault: 'Есть течь', 
        defectOptions: ['Течь рулевой рейки', 'Течь шланга высокого давления', 'Течь шланга низкого давления', 'Течь бачка ГУР', 'Течь насоса ГУР']
    },
    {
        id: 49,
        type: EQuestionType.MultiSelect, 
        title: 'Течи трансмиссионного масла', 
        docTitle: 'Течи трансмиссионного масла',
        ok: 'Нет течи', 
        fault: 'Есть течь', 
        defectOptions: ['Редуктор переднего моста', 'Раздаточная коробка', 'Муфта полного привода', 'Редуктор заднего моста']
    },
    {
        id: 50,
        type: EQuestionType.MultiSelect, 
        title: 'Течи масла АКПП/МКПП', 
        docTitle: 'Течи масла АКПП/МКПП',
        ok: 'Нет течи', 
        fault: 'Есть течь', 
        defectOptions: ['Течь левого сальника КПП', 'Течь правого сальника КПП', 'Течь поддона', 'Течь трубок охлаждения КПП', 'Течь фланца охлаждения/термостата']
    },
    {
        id: 51,
        type: EQuestionType.MultiSelect, 
        title: 'Течи охлаждающей жидкости', 
        docTitle: 'Течи охлаждающей жидкости',
        ok: 'Нет течи', 
        fault: 'Есть течь', 
        defectOptions: ['Течь радиатора основного', 'Течь радиатора отопителя', 'Течь шлангов охлаждения', 'Течь водяного насоса (помпы)']
    },
    {
        id: 52,
        type: EQuestionType.MultiSelect, 
        title: 'Амортизаторы передние', 
        docTitle: 'Амортизаторы передние',
        defectOptions: ['Левый', 'Правый'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Течь', 'Запотевание', 'Посторонний звук']
        }
    },
    {
        id: 53,
        type: EQuestionType.MultiSelect, 
        title: 'Пружины передние', 
        docTitle: 'Пружины передние',
        defectOptions: ['Левая', 'Правая'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Сломана', 'Просела', 'Посторонний звук']
        }
    },
    {
        id: 54,
        type: EQuestionType.MultiSelect, 
        title: 'Опоры амортизаторов/подшипники передние', 
        docTitle: 'Опоры амортизаторов/подшипники передние',
        defectOptions: ['Левая', 'Правая'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Скрип/шум подшипника', 'Опора просела']
        }
    },
    {
        id: 55,
        type: EQuestionType.InfoSelect, 
        title: 'Укажите количество рычагов передней подвески', 
        docTitle: '',
        options: ['2', '4', '6', '8'], 
        skipLogic: [
            {
                option: '2', 
                skipId: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80]
            },
            {
                option: '4',
                skipId: [57, 58, 59, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80]
            },
            {
                option: '6',
                skipId: [57, 58, 59, 60, 61, 62, 63, 64, 72, 73, 74, 75, 76, 77, 78, 79, 80]
            },
            {
                option: '8',
                skipId: [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71]
            }
        ]
    },
    {
        id: 57,
        type: EQuestionType.MultiSelect, 
        title: 'Шаровые опоры',
        docTitle: 'Шаровые опоры',
        defectOptions: ['Левая', 'Правая'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Люфт', 'Порван пыльник']
        }
    },
    {
        id: 58,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки левого рычага', 
        docTitle: 'Сайлентблоки левого рычага',
        defectOptions: ['Передний', 'Задний'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 59,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки правого рычага', 
        docTitle: 'Сайлентблоки правого рычага',
        defectOptions: ['Передний', 'Задний'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 60,
        type: EQuestionType.MultiSelect, 
        title: 'Шаровые опоры', 
        docTitle: 'Шаровые опоры', 
        defectOptions: ['Нижняя левая', 'Верхняя левая', 'Нижняя правая', 'Верхняя правая'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Люфт', 'Порван пыльник']
        }
    },
    {
        id: 61,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки левого нижнего рычага', 
        docTitle: 'Сайлентблоки левого нижнего рычага',
        defectOptions: ['Передний', 'Задний'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 62,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки левого верхнего рычага', 
        docTitle: 'Сайлентблоки левого верхнего рычага',
        defectOptions: ['Передний', 'Задний'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 63,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки правого нижнего рычага', 
        docTitle: 'Сайлентблоки правого нижнего рычага',
        defectOptions: ['Передний', 'Задний'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 64,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки правого верхнего рычага', 
        docTitle: 'Сайлентблоки правого верхнего рычага',
        defectOptions: ['Передний', 'Задний'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 65,
        type: EQuestionType.MultiSelect,
        title: 'Шаровые опоры', 
        docTitle: 'Шаровые опоры', 
        defectOptions: ['Левого переднего нижнего рычага', 'Левого заднего нижнего рычага', 'Левого верхнего рычага', 'Правого переднего нижнего рычага'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Люфт', 'Порван пыльник']
        }
    },
    {
        id: 66,
        type: EQuestionType.Select, 
        title: 'Сайлентблок левого переднего нижнего рычага', 
        docTitle: 'Сайлентблок левого переднего нижнего рычага', 
        defectOptions: ['Трещины', 'Надрывы', 'Отслоение втулки', 'Рычаг имеет дефект'],
    },
    {
        id: 67,
        type: EQuestionType.Select, 
        title: 'Сайлентблок левого заднего нижнего рычага', 
        docTitle: 'Сайлентблок левого заднего нижнего рычага', 
        defectOptions: ['Трещины', 'Надрывы', 'Отслоение втулки', 'Рычаг имеет дефект'],
    },
    {
        id: 68,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки левого верхнего рычага', 
        docTitle: 'Сайлентблоки левого верхнего рычага',
        defectOptions: ['Передний', 'Задний'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 69,
        type: EQuestionType.Select, 
        title: 'Сайлентблок правого переднего нижнего рычага', 
        docTitle: 'Сайлентблок правого переднего нижнего рычага', 
        defectOptions: ['Трещины', 'Надрывы', 'Отслоение втулки', 'Рычаг имеет дефект'],
    },
    {
        id: 70,
        type: EQuestionType.Select, 
        title: 'Сайлентблок правого заднего нижнего рычага', 
        docTitle: 'Сайлентблок правого заднего нижнего рычага', 
        defectOptions: ['Трещины', 'Надрывы', 'Отслоение втулки', 'Рычаг имеет дефект'],
    },
    {
        id: 71,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки правого верхнего рычага',
        docTitle: 'Сайлентблоки правого верхнего рычага',
        defectOptions: ['Передний', 'Задний'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 72,
        type: EQuestionType.MultiSelect,
        title: 'Шаровые опоры', 
        docTitle: 'Шаровые опоры', 
        defectOptions: ['Левого переднего нижнего', 'Левого заднего нижнего', 'Левого переднего верхнего', 'Левого заднего верхнего'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Люфт', 'Порван пыльник']
        }
    },
    {
        id: 73,
        type: EQuestionType.Select, 
        title: 'Сайлентблок левого переднего нижнего рычага', 
        docTitle: 'Сайлентблок левого переднего нижнего рычага', 
        defectOptions: ['Трещины', 'Надрывы', 'Отслоение втулки', 'Рычаг имеет дефект'],
    },
    {
        id: 74,
        type: EQuestionType.Select, 
        title: 'Сайлентблок левого заднего нижнего рычага', 
        docTitle: 'Сайлентблок левого заднего нижнего рычага', 
        defectOptions: ['Трещины', 'Надрывы', 'Отслоение втулки', 'Рычаг имеет дефект'],
    },
    {
        id: 75,
        type: EQuestionType.Select, 
        title: 'Сайлентблок левого переднего верхнего рычага', 
        docTitle: 'Сайлентблок левого переднего верхнего рычага', 
        defectOptions: ['Трещины', 'Надрывы', 'Отслоение втулки', 'Рычаг имеет дефект'],
    },
    {
        id: 76,
        type: EQuestionType.Select, 
        title: 'Сайлентблок левого заднего верхнего рычага', 
        docTitle: 'Сайлентблок левого заднего верхнего рычага', 
        defectOptions: ['Трещины', 'Надрывы', 'Отслоение втулки', 'Рычаг имеет дефект'],
    },
    {
        id: 77,
        type: EQuestionType.Select, 
        title: 'Сайлентблок правого переднего нижнего рычага', 
        docTitle: 'Сайлентблок правого переднего нижнего рычага', 
        defectOptions: ['Трещины', 'Надрывы', 'Отслоение втулки', 'Рычаг имеет дефект'],
    },
    {
        id: 78,
        type: EQuestionType.Select, 
        title: 'Сайлентблок правого заднего нижнего рычага', 
        docTitle: 'Сайлентблок правого заднего нижнего рычага', 
        defectOptions: ['Трещины', 'Надрывы', 'Отслоение втулки', 'Рычаг имеет дефект'],
    },
    {
        id: 79,
        type: EQuestionType.Select, 
        title: 'Сайлентблок правого переднего верхнего рычага', 
        docTitle: 'Сайлентблок правого переднего верхнего рычага', 
        defectOptions: ['Трещины', 'Надрывы', 'Отслоение втулки', 'Рычаг имеет дефект'],
    },
    {
        id: 80,
        type: EQuestionType.Select, 
        title: 'Сайлентблок правого заднего верхнего рычага', 
        docTitle: 'Сайлентблок правого заднего верхнего рычага', 
        defectOptions: ['Трещины', 'Надрывы', 'Отслоение втулки', 'Рычаг имеет дефект'],
    },
    {
        id: 81,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки переднего подрамника',
        docTitle: 'Сайлентблоки переднего подрамника',
        defectOptions: ['Передний левый', 'Передний правый', 'Центральный левый', 'Центральный правый'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 82,
        type: EQuestionType.MultiSelect, 
        title: 'Стойки переднего стабилизатора', 
        docTitle: 'Стойки переднего стабилизатора',
        defectOptions: ['Левая', 'Правая'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Стук', 'Люфт', 'Отсутствует']
        }
    },
    {
        id: 83,
        type: EQuestionType.MultiSelect, 
        title: 'Втулки переднего стабилизатора', 
        docTitle: 'Втулки переднего стабилизатора', 
        defectOptions: ['Левая', 'Правая'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Стук', 'Люфт']
        }
    },
    {
        id: 84,
        type: EQuestionType.Select, 
        title: 'Рейка рулевая', 
        docTitle: 'Рейка рулевая',
        defectOptions: ['Люфт', 'Стук', 'Течь']
    },
    {
        id: 85,
        type: EQuestionType.MultiSelect, 
        title: 'Тяги рулевые', 
        docTitle: 'Тяги рулевые',
        defectOptions: ['Левая', 'Правая'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Стук', 'Люфт']
        }
    },
    {
        id: 86,
        type: EQuestionType.MultiSelect, 
        title: 'Наконечники рулевые', 
        docTitle: 'Наконечники рулевые',
        defectOptions: ['Левая', 'Правая'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Стук', 'Люфт']
        }
    },
    {
        id: 87,
        type: EQuestionType.MultiSelect, 
        title: 'Крестовины рулевого вала', 
        docTitle: 'Крестовины рулевого вала',
        defectOptions: ['Верхняя', 'Центральная', 'Нижняя'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Стук', 'Люфт']
        }
    },
    {
        id: 88,
        type: EQuestionType.MultiSelect, 
        title: 'Проверьте опоры ДВС/КПП', 
        docTitle: 'Проверьте опоры ДВС/КПП',
        defectOptions: ['Левая', 'Правая', 'Передняя', 'Задняя'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Просела', 'Отслоение втулки']
        }
    },
    {
        id: 89,
        type: EQuestionType.MultiSelect, 
        title: 'ШРУСа (пыльники) передние', 
        docTitle: 'ШРУСа (пыльники) передние',
        defectOptions: ['Левый наружный', 'Левый внутренний', 'Правый внутренний', 'Правый наружный', 'Подшипник промежуточный'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Люфт/стук', 'Порван пыльник', 'Нарушена герметичность', 'Гул']
        }
    },
    {
        id: 90,
        type: EQuestionType.MultiSelect, 
        title: 'Вал карданный передний', 
        docTitle: 'Вал карданный передний',
        defectOptions: ['Муфта передняя', 'Крестовина передняя', 'Крестовина задняя', 'Муфта задняя'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Люфт/стук', 'Расслоение']
        }
    },
    {
        id: 91,
        type: EQuestionType.MultiSelect, 
        title: 'Вал карданный задний',
        docTitle: 'Вал карданный задний',
        defectOptions: ['Муфта передняя', 'Крестовина передняя', 'Подшипник подвесной', 'Крестовина задняя', 'Муфта задняя'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Люфт/стук', 'Расслоение', 'Гул']
        }
    },
    {
        id: 92,
        type: EQuestionType.MultiSelect, 
        title: 'ШРУСа (пыльники) задние', 
        docTitle: 'ШРУСа (пыльники) задние',
        defectOptions: ['Левый наружный', 'Левый внутренний', 'Правый внутренний', 'Правый наружный'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Люфт/стук', 'Порван пыльник', 'Нарушена герметичность']
        }
    },
    {
        id: 93,
        type: EQuestionType.MultiSelect, 
        title: 'Амортизаторы задние', 
        docTitle: 'Амортизаторы задние',
        defectOptions: ['Левый', 'Правый'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Течь', 'Запотевание', 'Посторонний звук']
        }
    },
    {
        id: 94,
        type: EQuestionType.MultiSelect, 
        title: 'Пружины задние', 
        docTitle: 'Пружины задние', 
        defectOptions: ['Левая', 'Правая'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Сломана', 'Просела', 'Посторонний звук']
        }
    },
    {
        id: 95,
        type: EQuestionType.MultiSelect, 
        title: 'Опоры амортизаторов задние', 
        docTitle: 'Опоры амортизаторов задние',
        defectOptions: ['Левая', 'Правая'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Скрип/шум подшипника', 'Опора просела']
        }
    },
    {
        id: 96,
        type: EQuestionType.MultiSelect, 
        title: 'Подшипники ступиц задние', 
        docTitle: 'Подшипники ступиц задние', 
        defectOptions: ['Левый', 'Правый'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Шум', 'Люфт']
        }
    },
    {
        id: 97,
        type: EQuestionType.InfoSelect, 
        title: 'Укажите количество рычагов задней подвески', 
        docTitle: '',
        options: ['Балка', '6', '8', '10'], 
        skipLogic: [
            {
                option: 'Балка',
                skipId: [99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130]
            },
            {
                option: '6',
                skipId: [98, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128]
            },
            {
                option: '8',
                skipId: [98, 99, 100, 101, 102, 103, 104, 105, 106, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128]
            },
            {
                option: '10',
                skipId: [98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116]
            }
        ]
    },
    {
        id: 98,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки балки', 
        docTitle: 'Сайлентблоки балки',
        defectOptions: ['Левый', 'Правый'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки', 'Балка имеет дефект']
        }
    },
    {
        id: 99,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки левого продольного рычага', 
        docTitle: 'Сайлентблоки левого продольного рычага',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 100,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки левого поперечного переднего рычага', 
        docTitle: 'Сайлентблоки левого поперечного переднего рычага',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 101,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки левого поперечного заднего рычага', 
        docTitle: 'Сайлентблоки левого поперечного заднего рычага',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 102,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки правого продольного рычага', 
        docTitle: 'Сайлентблоки правого продольного рычага',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 103,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки правого поперечного переднего рычага', 
        docTitle: 'Сайлентблоки правого поперечного переднего рычага',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 103,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки правого поперечного заднего рычага', 
        docTitle: 'Сайлентблоки правого поперечного заднего рычага',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 105,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки кулака', 
        docTitle: 'Сайлентблоки кулака',
        defectOptions: ['Левого', 'Правого'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 106,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки заднего подрамника', 
        docTitle: 'Сайлентблоки заднего подрамника',
        defectOptions: ['Передний левый', 'Передний правый', 'Центральный левый', 'Центральный правый'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 107,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки левого продольного рычага', 
        docTitle: 'Сайлентблоки левого продольного рычага',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 108,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки левого поперечного нижнего рычага', 
        docTitle: 'Сайлентблоки левого поперечного нижнего рычага',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 109,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки левого поперечного верхнего рычага', 
        docTitle: 'Сайлентблоки левого поперечного верхнего рычага',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 110,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки левой тяги', 
        docTitle: 'Сайлентблоки левой тяги',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 111,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки правого продольного рычага', 
        docTitle: 'Сайлентблоки правого продольного рычага',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 112,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки правого поперечного нижнего рычага', 
        docTitle: 'Сайлентблоки правого поперечного нижнего рычага',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 113,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки правого поперечного верхнего рычага', 
        docTitle: 'Сайлентблоки правого поперечного верхнего рычага',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 114,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки правой тяги', 
        docTitle: 'Сайлентблоки правой тяги',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 115,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки кулака', 
        docTitle: 'Сайлентблоки кулака',
        defectOptions: ['Левого', 'Правого'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 116,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки заднего подрамника', 
        docTitle: 'Сайлентблоки заднего подрамника',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 117,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки левого продольного нижнего рычага', 
        docTitle: 'Сайлентблоки левого продольного нижнего рычага',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 118,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки левого продольного верхнего рычага', 
        docTitle: 'Сайлентблоки левого продольного верхнего рычага',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 119,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки левого поперечного нижнего рычага', 
        docTitle: 'Сайлентблоки левого поперечного нижнего рычага',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 120,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки левого поперечного верхнего рычага', 
        docTitle: 'Сайлентблоки левого поперечного верхнего рычага',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 121,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки левой тяги', 
        docTitle: 'Сайлентблоки левой тяги',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 122,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки правого продольного нижнего рычага', 
        docTitle: 'Сайлентблоки правого продольного нижнего рычага',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 123,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки правого продольного верхнего рычага', 
        docTitle: 'Сайлентблоки правого продольного верхнего рычага',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 124,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки правого поперечного нижнего рычага', 
        docTitle: 'Сайлентблоки правого поперечного нижнего рычага',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 125,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки правого поперечного верхнего рычага', 
        docTitle: 'Сайлентблоки правого поперечного верхнего рычага',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 126,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки правой тяги', 
        docTitle: 'Сайлентблоки правой тяги',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 127,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки кулака', 
        docTitle: 'Сайлентблоки кулака',
        defectOptions: ['Левого', 'Правого'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 128,
        type: EQuestionType.MultiSelect, 
        title: 'Сайлентблоки заднего подрамника', 
        docTitle: 'Сайлентблоки заднего подрамника',
        defectOptions: ['Передний (к кузову)', 'Задний (к кулаку)'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Трещины', 'Надрывы', 'Отслоение втулки']
        }
    },
    {
        id: 129,
        type: EQuestionType.MultiSelect, 
        title: 'Стойки заднего стабилизатора', 
        docTitle: 'Стойки заднего стабилизатора',
        defectOptions: ['Левая', 'Правая'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Стук', 'Люфт', 'Отсутствует']
        }
    },
    {
        id: 130,
        type: EQuestionType.MultiSelect, 
        title: 'Втулки заднего стабилизатора', 
        docTitle: 'Втулки заднего стабилизатора',
        defectOptions: ['Левая', 'Правая'], 
        subQuestion: {
            title: 'Уточните неисправность для ', 
            options: ['Стук', 'Люфт']
        }
    },
    {
        id: 131,
        type: EQuestionType.Input, 
        title: 'Гофра', 
        docTitle: 'Гофра',
        input: 'Укажите количество и размеры'
    },
    {
        id: 132,
        type: EQuestionType.Input, 
        title: 'Фланец глушителя', 
        docTitle: 'Фланец глушителя',
        input: 'Укажите количество и размеры'
    },
    {
        id: 133,
        type: EQuestionType.Input, 
        title: 'Хомут глушителя', 
        docTitle: 'Хомут глушителя',
        input: 'Укажите количество и размеры'
    },
    {
        id: 134,
        type: EQuestionType.Input, 
        title: 'Крепления глушителя', 
        docTitle: 'Крепления глушителя',
        input: 'Укажите количество'
    },
    {
        id: 135,
        type: EQuestionType.Input, 
        title: 'Подвесы глушителя', 
        docTitle: 'Подвесы глушителя',
        input: 'Укажите количество'
    },
    {
        id: 136,
        type: EQuestionType.Input, 
        title: 'Резонатор глушителя',
        docTitle: 'Резонатор глушителя',
    },
    {
        id: 137,
        type: EQuestionType.Input, 
        title: 'Задняя банка глушителя',
        docTitle: 'Задняя банка глушителя'
    },
    {
        id: 140,
        type: EQuestionType.Final, 
        title: 'Иные замечания',
        docTitle: 'Иные замечания'
    }
]