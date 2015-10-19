#!/usr/bin/env python3
# coding: utf-8

import re
import sys
import json
import time
import calendar
import os.path
import argparse


def find(dics, key, val):
    for elm in find_all(dics, key, val):
        return elm


def find_all(dics, key, val):
    return filter(lambda dic: dic[key]==val, dics)


class Registrar(object):
    def __init__(self):
        self.enc = sys.getdefaultencoding()
        if os.path.isfile("member.json"):
            with open("member.json") as fh:
                self.data = json.loads(fh.read(), self.enc)
        else:
            self.data = []

    def done(self):
        code = json.dumps(self.data, ensure_ascii=False, indent=2)
        with open("member.json", 'w') as fh:
            fh.write(code)
            fh.close()

    def show(self):
        for member in self.data:
            print('- %s' % member['name'])
            print('github: %s' % member['github'])
            print('twitter: %s' % member['twitter'])
            print('message: %s\n' % member['message'])

    def add(self, name, github=None, twitter=None, message=None):
        if find(self.data, 'name', name):
            print("%s has been registered." % name)
            return False

        elm = {'name': name, 'github': '', 'twitter': '', 'message': ''}

        self.data.append(elm)
        if github is not None:
            self.register(name, 'github', github)
        if twitter is not None:
            self.register(name, 'twitter', twitter)
        if message is not None:
            self.register(name, 'message', message)

        print("%s registered." % name)

    def rm(self, name):
        member = find(self.data, 'name', name)

        if member is None:
            print("%s is not in the registered list." % name)
            return False

        self.data.remove(member)
        print("%s removed." % name)

    def register(self, name, key, val):
        member = find(self.data, 'name', name)

        if member is None:
            print("%s is not in the registered list." % name)
            return False

        index = self.data.index(member)
        self.data[index][key] = val
        print("set %s: %s" % (key, val))


if __name__ == "__main__":
    rgst = Registrar()

    # build parser
    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers(help='sub-commands')

    # show
    parser_show = subparsers.add_parser('show',
        help='show registered users')
    parser_show.set_defaults(func=rgst.show)

    # add
    parser_add = subparsers.add_parser('add',
        help='register file to index')
    parser_add.add_argument('name', help='your name')
    parser_add.add_argument('-g', '--github', nargs='?',
        help='your github ID')
    parser_add.add_argument('-t', '--twitter', nargs='?',
        help='your twitter ID')
    parser_add.add_argument('-m', '--message', nargs='?',
        help='your introduction message')
    parser_add.set_defaults(func=rgst.add)

    # rm
    parser_rm = subparsers.add_parser('rm',
        help='remove registered user from index')
    parser_rm.add_argument('name', help='user name')
    parser_rm.set_defaults(func=rgst.rm)

    # github
    parser_gh = subparsers.add_parser('github', help='set github ID')
    parser_gh.add_argument('name', help='user name')
    parser_gh.add_argument('id', help='your github ID')
    regist = lambda name, id: rgst.register(name, 'github', id)
    parser_gh.set_defaults(func=regist)

    # twitter
    parser_tw = subparsers.add_parser('twitter', help='set twitter ID')
    parser_tw.add_argument('name', help='user name')
    parser_tw.add_argument('id', help='your twitter ID')
    regist = lambda name, id: rgst.register(name, 'twitter', id)
    parser_tw.set_defaults(func=regist)

    # message
    parser_msg = subparsers.add_parser('message', help='set message')
    parser_msg.add_argument('name', help='user name')
    parser_msg.add_argument('message', help='your message')
    regist = lambda name, message: rgst.register(name, 'message', message)
    parser_msg.set_defaults(func=regist)

    args = parser.parse_args()
    if isinstance(args, argparse.Namespace):
        dic = vars(args)
        if dic == {}:
            parser.print_usage()
            exit()
        func = args.func
        dic.pop('func')
        func(**dic)
    else:
        print(args)

    rgst.done()
