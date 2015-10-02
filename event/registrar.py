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


def convert_utime(rawtime):
    structured = time.strptime(rawtime, '%Y-%m-%d')
    return calendar.timegm(structured)


def struct_utime(unixtime):
    structured = time.gmtime(unixtime)
    return '-'.join(map(str, structured[:3]))


class Registrar(object):
    def __init__(self):
        self.enc = sys.getdefaultencoding()
        if os.path.isfile("index.json"):
            with open("index.json") as fh:
                self.data = json.loads(fh.read(), self.enc)
        else:
            self.data = []

    def done(self):
        code = json.dumps(self.data, ensure_ascii=False, indent=2)
        with open("index.json", 'w') as fh:
            fh.write(code)
            fh.close()

    def show(self):
        for article in self.data:
            deadline = struct_utime(article['deadline'])
            print('- %s' % article['fname'])
            print('deadline: %s' % deadline)
            print('caption: %s\n' % article['caption'])

    def add(self, fname, deadline=None, caption=None):
        if find(self.data, 'fname', fname):
            print("%s has been registered." % fname)
            return False

        if os.path.isfile(fname) == False:
            print("%s does not exist." % fname)
            return False

        elm = {'fname': fname, 'deadline': 0, 'caption': ''}

        self.data.append(elm)
        if deadline is not None:
            self.doom(fname, deadline)
        if caption is not None:
            self.summarize(fname, caption)

        print("%s registered." % fname)

    def rm(self, fname):
        article = find(self.data, 'fname', fname)

        if article is None:
            print("%s is not in the registered list." % fname)
            return False

        self.data.remove(article)
        print("%s removed." % fname)

    def doom(self, fname, deadline):
        article = find(self.data, 'fname', fname)

        if article is None:
            print("%s is not in the registered list." % fname)
            return False

        index = self.data.index(article)
        self.data[index]['deadline'] = convert_utime(deadline)
        print("%s will go to log in %s." % (fname, deadline))

    def summarize(self, fname, caption):
        article = find(self.data, 'fname', fname)

        if article is None:
            print("%s is not in the registered list." % fname)
            return False

        index = self.data.index(article)
        self.data[index]['caption'] = caption
        print("set caption: %s" % caption)


if __name__ == "__main__":
    rgst = Registrar()

    # build parser
    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers(help='sub-commands')

    # show
    parser_show = subparsers.add_parser('show',
        help='show registered files')
    parser_show.set_defaults(func=rgst.show)

    # add
    parser_add = subparsers.add_parser('add',
        help='register file to index')
    parser_add.add_argument('fname', help='file name')
    parser_add.add_argument('-d', '--deadline', nargs='?',
        help='the day that the article send to past log [yyyy-m-d]')
    parser_add.add_argument('-c', '--caption', nargs='?',
        help='the caption for the article')
    parser_add.set_defaults(func=rgst.add)

    # rm
    parser_rm = subparsers.add_parser('rm',
        help='remove registered file from index')
    parser_rm.add_argument('fname', help='file name')
    parser_rm.set_defaults(func=rgst.rm)

    # doom
    parser_rm = subparsers.add_parser('doom',
        help='remove registered file from index')
    parser_rm.add_argument('fname', help='file name')
    parser_rm.add_argument('deadline',
        help='the day that the article send to past log [yyyy-m-d]')
    parser_rm.set_defaults(func=rgst.doom)

    # summarize
    parser_rm = subparsers.add_parser('summarize',
        help='remove registered file from index')
    parser_rm.add_argument('fname', help='file name')
    parser_rm.add_argument('caption',
        help='the caption for the article')
    parser_rm.set_defaults(func=rgst.summarize)

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
