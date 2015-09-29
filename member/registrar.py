#!/usr/bin/env python3
# coding: utf-8

import os
import json
import argparse


def is_initialized():
    if os.path.isfile("index.json") is False:
        print("First of all, initialize index.json with `init` command.")
        return False
    return True


def init():
    f = open('index.json', 'w')
    f.write('[]')
    f.close()

    print('empty index.json was made.')


def show():
    lst = json.load(open("index.json"))

    for fname in lst:
        print(fname)


def remove(fname):
    lst = json.load(open("index.json"))

    if fname not in lst:
        print("%s is not in the registered list." % fname)
        return False

    lst.remove(fname)
    f = open("index.json", 'w')
    json.dump(lst, f, indent=2)
    f.close()
    print("%s removed." % fname)


def register(fname):
    lst = json.load(open("index.json"))

    if fname in lst:
        print("%s has been registered." % fname)
        return False

    if fname not in os.listdir():
        print("%s does not exist." % fname)
        return False

    lst.append(fname)
    f = open("index.json", 'w')
    json.dump(lst, f, indent=2)
    f.close()
    print("%s registered." % fname)


if __name__ == "__main__":
    # build parser
    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers(help='sub-commands')

    # init
    parser_init = subparsers.add_parser('init',
        help='show registered files')
    parser_init.set_defaults(func=init)

    # show
    parser_show = subparsers.add_parser('show',
        help='show registered files')
    parser_show.set_defaults(func=show)

    # add
    parser_add = subparsers.add_parser('add',
        help='register file to index')
    parser_add.add_argument('fname', type=str, help='file name')
    parser_add.set_defaults(func=register)

    # rm
    parser_rm = subparsers.add_parser('rm',
        help='remove registered file from index')
    parser_rm.add_argument('fname', type=str, help='file name')
    parser_rm.set_defaults(func=remove)

    args = parser.parse_args()
    if isinstance(args, argparse.Namespace):
        func = args.func
        dic = vars(args)
        if dic == {}:
            parser.print_usage()
            exit()
        dic.pop('func')
        if is_initialized():
            func(**dic)
    else:
        print(args)
