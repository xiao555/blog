import add from "./add"
import { expect } from "chai"

describe('Test Start',() => {
    describe('加法函数测试',() => {
        it('1 + 1 等于 2', () => expect(add(1, 1)).to.be.equal(2))
        it('返回值是Number',() => expect(add(1, 1)).to.be.a('number'))
    })
})